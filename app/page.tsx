import { ArrowRight } from 'lucide-react'
import {Button} from "@/components/ui/button";
import {SignUpButton} from "@clerk/nextjs";

export default async function LandingPage() {
    return (
        <div className='flex flex-col max-w-4xl mx-auto items-center justify-center space-y-6 h-screen w-screen'>
            <h1 className='text-2xl md:text-3xl lg:text-4xl px-4 sm:px-5 md:px-7 font-bold mb-2 text-center'>
                Land Your Dream Job with <span className='text-primary'>AI – Smarter Resumes</span>, Real Interview Practice, and Instant Feedback in One Place
            </h1>
            <p className='text-lg md:text-xl lg:text-2xl text-secondary-foreground dark:text-gray-300 mb-5 mx-auto text-center sm:px-5 md:px-7 px-4'>
                Step into the future of job hunting with tools designed to give you an edge — from ATS-friendly resume reviews to realistic mock interviews and AI-powered coaching. Whether you're a fresh graduate or a seasoned pro, we help you get hired, faster.
            </p>

            <SignUpButton>
                <Button className='mx-auto mt-12 md:mt-10 text-xl md:text-2xl lg:text-3xl flex items-center justify-center dark:bg-primary/90 py-8 rounded-full cursor-pointer font-light dark:hover:bg-secondary-foreground dark:hover:text-black hover:bg-secondary-foreground' size='lg'>
                    <div className='flex items-center justify-center font-semibold'>
                        Start Training
                        <ArrowRight className='ml-4 mt-1 size-8 md:size-10' />
                    </div>
                </Button>
            </SignUpButton>
        </div>
    )
}