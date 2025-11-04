'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
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
import FileUploader from "@/components/FileUploader";
import {analyzeResume} from "@/lib/actions/resume.actions";
import {useState} from "react";
import {useRouter} from "next/navigation";

const formSchema = z.object({
    companyName: z.string().min(3).max(50, 'Job title is required'),
    jobTitle: z.string().min(3).max(50, 'Job title is required'),
    jobDescription: z.string().min(3, 'Job description is required'),
})


export default function ResumeForm() {
    const [file, setFile] = useState<File | null>(null);
    const handleFileSelect = (file: File | null) => {
        setFile(file);
    }
    const router = useRouter()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            companyName: "",
            jobTitle: "",
            jobDescription: ""
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        if (!file) return
        const resume = await analyzeResume({...values, file})
        if (!resume) return 'Failed to create interview'
        console.log(resume)
        router.push(`/resume/${resume.id}`)
    }

    return (
        <main className='max-w-4xl items-center justify-center p-4 rounded-lg w-full mx-auto text-center mt-2'>
            <h1 className="text-2xl font-semibold mb-2">
                Smart Feedback For Your Dream Job
            </h1>
            <p className="pb-4">Drop your resume for an ATS score and improvements score</p>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                        control={form.control}
                        name="companyName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Company Name</FormLabel>
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
                                <FormLabel>Job Title</FormLabel>
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
                                <FormLabel>Job Description</FormLabel>
                                <FormControl>
                                    <Textarea placeholder={`Please copy and paste the job description here.`} {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className='space-y-2'>
                        <FormLabel>Resume</FormLabel>
                        <FileUploader
                            onFileSelect={handleFileSelect}
                            value={file}
                        />
                    </div>
                    <Button type="submit" className='w-full cursor-pointer hover:bg-secondary-foreground dark:hover:bg-secondary'>
                        Analyze Resume
                    </Button>
                </form>
            </Form>
        </main>
    )
}