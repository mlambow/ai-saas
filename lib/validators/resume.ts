import * as z from "zod";

export const ResumeSchema = z.object({
    companyName: z.string().min(3).max(50, 'Job title is required'),
    jobTitle: z.string().min(3).max(50, 'Job title is required'),
    jobDescription: z.string().min(3, 'Job description is required'),
})

export type ResumeValues = z.infer<typeof ResumeSchema>