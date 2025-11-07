'use server'

import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateText } from 'ai'
import {createSupabaseClient} from "@/lib/supabase";
import pdf from 'pdf-parse-new'
import {auth} from "@clerk/nextjs/server";
import {AIResponseFormat} from "@/constants";
import mammoth from "mammoth";
import {handleAnalyzeResume} from "@/types";

const google = createGoogleGenerativeAI({
    apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY
});

const supabase = createSupabaseClient()

function cleanAndParseJSON(text: string) {
    try {
        // 1️⃣ Remove markdown fences (```json ... ```)
        const cleaned = text
            .replace(/```json/gi, '')
            .replace(/```/g, '')
            .trim();

        // 2️⃣ Extract the first JSON-like block just in case model adds commentary
        const match = cleaned.match(/{[\s\S]*}/);
        if (!match) {
            console.log("No JSON object found in text");
            return null;
        }

        // 3️⃣ Parse it
        return JSON.parse(match[0]);
    } catch (err) {
        console.error("Failed to parse feedback JSON:", err);
        console.log("Raw feedback text:", text);
        return null;
    }
}

export const analyzeResume = async ({jobDescription, companyName, jobTitle, file} : handleAnalyzeResume) => {
    const {userId} = await auth();

    //extract text from resume
    let resumeText = ''
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    try{
        if (file.type === 'application/pdf') {
            const pdfData = await pdf(buffer)
            resumeText =  pdfData.text;
        } else if (
            file.type ===
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
            file.type === "application/msword"
        ) {
            const result = await mammoth.extractRawText({buffer});
            resumeText = result.value;
        } else if (file.type === "text/plain") {
            resumeText = buffer.toString("utf-8");
        } else {
            new Error("Unsupported file type. Please upload PDF, Word, or text files.");
        }
    }catch(error){
        console.error("Failed to parse resume:", error);
        throw new Error("Could not extract text from resume. Please try another file.");
    }
    console.log(resumeText)

    //generating the feedback
    const {text: result} = await generateText({
        model: google("gemini-2.0-flash"),
        prompt: `You are an expert in ATS (Applicant Tracking System) and resume analysis.
      Please analyze and rate this resume and suggest how to improve it.
      The rating can be low if the resume is bad.
      Be thorough and detailed. Don't be afraid to point out any mistakes or areas for improvement.
      If there is a lot to improve, don't hesitate to give low scores. This is to help the user to improve their resume.
      If available, use the job description for the job user is applying to, to give more detailed feedback.
      If provided, take the job description into consideration.
      The job title is: ${jobTitle}
      The job description is: ${jobDescription}
      This is the resume: ${resumeText}
      Provide the feedback using the following format: ${AIResponseFormat}
      Return the analysis as a JSON object, without any other text and without the backticks.
      Do not include any other text or comments.`
    });

    const feedback = cleanAndParseJSON(result)

    const { data: resume } = await supabase
        .from('resume')
        .insert({
            user_id: userId,
            job_description: jobDescription,
            job_title: jobTitle,
            company_name: companyName,
            feedback: feedback
        }).select().single()

    return resume;
}

export const getResume = async (id : string) => {
    const { data, error } = await supabase
        .from('resume')
        .select()
        .eq('id', id).single();

    if(error) return console.log(error);

    let feedback = data?.feedback;
    if (typeof feedback === "string") {
        try {
            feedback = JSON.parse(feedback);
        } catch {
            console.error("Could not parse feedback JSON");
        }
    }

    return { ...data, feedback };
}

export const getUserResume = async (userId: string) => {
    const { data, error } = await supabase
        .from('resume')
        .select()
        .eq('user_id', userId)
        .order('created_at',{ ascending: false });

    if (error) throw new Error(error.message);

    return data
}