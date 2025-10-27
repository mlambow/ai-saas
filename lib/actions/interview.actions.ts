'use server'

import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateText } from 'ai'
import {createSupabaseClient} from "@/lib/supabase";
import {auth} from "@clerk/nextjs/server";

const google = createGoogleGenerativeAI({
    apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY
});

const supabase = createSupabaseClient()

export const createInterview = async ({jobTitle, jobDescription, experienceLevel, numQuestions}: CreateInterview) => {
    const { userId } = await auth()
    const { text: result } = await generateText({
        model: google("gemini-2.5-flash"),
        prompt: `Prepare questions for a job interview.
        The job role is ${jobTitle}.
        The job experience level is ${experienceLevel}.
        The questions should be base on this job description: ${jobDescription}.
        The amount of questions required is: ${numQuestions}.
        Please return only the questions, without any additional text.
        The questions are going to be read by a voice assistant so do not use "/" or "*" or any other special characters which might break the voice assistant.
        Return the questions formatted like this:
        ["Question 1", "Question 2", "Question 3"]
        
        Thank you! <3
    `,
    });

    const questions = result
        .split('\n')
        .map(q => q.replace(/^\d+[.\s-]+/, '').trim())
        .filter(q => q.length > 0);

    const { data: interview } = await supabase
        .from('interviews')
        .insert({
            user_id: userId,
            job_title: jobTitle,
            job_description: jobDescription,
            experience_level: experienceLevel,
            questions: questions
        })
        .select()
        .single();

    return interview[0]
}