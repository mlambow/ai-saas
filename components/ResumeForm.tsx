'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { toast } from 'sonner'
import FileUploader from "@/components/FileUploader";
import {createResume, updateResume} from "@/lib/actions/resume.actions";
import {useState} from "react";
import {useRouter} from "next/navigation";
import {ResumeValues, ResumeSchema} from "@/lib/validators/resume";

interface ResumeFormProps {
    resume: Resume | null;
}

export default function ResumeForm({resume} : ResumeFormProps) {
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState<boolean>(false)
    const handleFileSelect = (file: File | null) => {
        setFile(file);
    }
    const router = useRouter()
    const form = useForm<ResumeValues>({
        resolver: zodResolver(ResumeSchema),
        defaultValues: {
            companyName: resume?.company_name ?? "",
            jobTitle: resume?.job_title ?? "",
            jobDescription: resume?.job_description ?? ""
        },
    })

    const onSubmit = async (values: ResumeValues) => {
        if (!file) {
            toast.error("Please upload a resume file.");
            return;
        }

        setLoading(true);
        toast.message("Analyzing resume...", {
            description: "Your resume is being scanned and analyzed.",
        });

        const formData = new FormData();
        formData.append("companyName", values.companyName);
        formData.append("jobTitle", values.jobTitle);
        formData.append("jobDescription", values.jobDescription ?? "");
        formData.append("file", file);

        try {
            const response = resume
                ? await updateResume(resume.id, formData) // update mode
                : await createResume(formData); // create mode

            toast.success("Resume analyzed successfully!", {
                description: "Redirecting you to the results...",
            });

            router.push(`/resume/${response.resume.id}`);

        } catch (error) {
            console.error(error);
            toast.error("Something went wrong.", {
                description: "Please try again or upload another file.",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className='max-w-4xl items-center justify-center p-4 rounded-lg w-full mx-auto text-center mt-2'>
            <h1 className="text-lg md:text-2xl font-semibold mb-2">
                Smart Feedback For Your Dream Job
            </h1>
            {loading ?
                <div className='flex flex-col items-center justify-center'>
                    <p className='text-sm md:text-base'>PLease wait as we analyse your resume</p>
                    <img src='/resume-scan.gif' alt='loading' className='md:size-1/2'/>
                </div>
                :
                    <p className="pb-4 text-sm md:text-base">{resume ?
                        'Drop your updated resume for an improved score'
                        : 'Drop your resume for an ATS score and improvements score'}
                    </p>
            }
               {!loading &&
                <>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <FormField
                                control={form.control}
                                name="companyName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className='text-sm md:text-base'>Company Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Amazon, Google, Shoprite" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="jobTitle"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className='text-sm md:text-base'>Job Title</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Software Developer, Auditor, Cashier" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="jobDescription"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className='text-sm md:text-base'>Job Description</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder={`Please copy and paste the job description here.`} {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className='space-y-2'>
                                <FormLabel className='text-sm md:text-base'>Resume</FormLabel>
                                <FileUploader
                                    onFileSelect={handleFileSelect}
                                    value={file}
                                />
                            </div>
                            <Button type="submit" className='w-full cursor-pointer hover:bg-secondary-foreground dark:hover:bg-secondary'>
                                {resume ? 'Update Resume' : 'Analyze Resume'}
                            </Button>
                        </form>
                    </Form>
                </>
               }
        </main>
    )
}