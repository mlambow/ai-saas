'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import {Textarea} from "@/components/ui/textarea";
import {useState} from "react";
import {Loader} from "lucide-react";
import {interviewFormSchema} from "@/lib/utils";

// const [isProcessing, setIsProcessing] = useState(false)
// const [status, setStatus] = useState('')

const formSchema = z.object({
    jobTitle: z.string().min(3).max(50, 'Job title is required'),
    experienceLevel: z.string().min(3).max(50, 'Experience level is required'),
    numQuestions: z.coerce.number().min(1).max(10, 'Number of questions must be between 1 - 10'),
    jobDescription: z.string().min(3, 'Job description is required'),
})

export default function InterviewForm() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            jobTitle: "",
            experienceLevel: '',
            numQuestions: 1,
            jobDescription: "",
        },
    })
    
    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
    }

    return (
        <main className='max-w-4xl items-center justify-center p-4 rounded-lg w-full mx-auto text-center mt-2'>
            <h1 className='text-2xl font-semibold p-3'>AI Powered Interview Preparation</h1>
            <p className="pb-4">Please fill in the relevant fields to start preparing for your big day</p>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                        name="experienceLevel"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Experience Level</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        value={field.value}
                                        defaultValue={field.value}
                                    >
                                    <FormControl>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select experience level" />
                                        </SelectTrigger>
                                    </FormControl>
                                        <SelectContent>
                                            <SelectItem value="junior">Junior (0 - 2 years)</SelectItem>
                                            <SelectItem value="mid-level">Mid-Level (2 - 5 years)</SelectItem>
                                            <SelectItem value="senior">Senior (5+ years)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="numQuestions"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Number of questions</FormLabel>
                                <FormControl>
                                    <Input type='number' placeholder="1 - 10" {...field} />
                                </FormControl>
                                <FormMessage/>
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
                                    <Textarea placeholder={`Please include the skills you would like to be interviewed on or include the job requirements from job description`} {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className='w-full cursor-pointer hover:bg-secondary-foreground dark:hover:bg-secondary'>
                        Create an Interview
                    </Button>
                </form>
            </Form>
        </main>
    )
}