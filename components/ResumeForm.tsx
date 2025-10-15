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

const ACCEPTED_TYPES = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'text/plain',
]

const formSchema = z.object({
    companyName: z.string().min(3).max(50, 'Job title is required'),
    jobTitle: z.string().min(3).max(50, 'Job title is required'),
    jobDescription: z.string().min(3, 'Job description is required'),
    file: z.instanceof(File, { message: "Please upload a valid file" })
        .refine(file => file.size <= 10 * 1024 * 1024, {
            message: "File must be less than 10MB",
        })
        .refine(file => ACCEPTED_TYPES.includes(file.type), {
            message: "Invalid file type. Only PDF, DOC, DOCX, and TXT are allowed.",
        }),
})

export default function ResumeForm() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            companyName: "",
            jobTitle: "",
            jobDescription: "",
            file: undefined
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
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
                    <FormField
                        control={form.control}
                        name="file"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Resume</FormLabel>
                                <FormControl>
                                    <FileUploader
                                        onFileSelect={(file: File | null) => field.onChange(file)}
                                        value={field.value}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className='w-full cursor-pointer hover:bg-secondary-foreground dark:hover:bg-secondary'>
                        Analyze Resume
                    </Button>
                </form>
            </Form>
        </main>
    )
}