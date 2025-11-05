import Summary from "@/components/Summary";
import {getResume} from "@/lib/actions/resume.actions";
import ATS from "@/components/ATS";
import Details from "@/components/Details";

interface ResumeFeedbackPageProps {
    params: Promise<{ id: string}>;
}


const ResumeFeedback = async ({ params }: ResumeFeedbackPageProps)=> {
    const {id} = await params
    const resume = await getResume(id)

    return(
        <main className='space-y-4 mx-auto w-full max-w-4xl items-center justify-center px-12 py-4 max-md:px-4'>
            <h2 className='text-center text-2xl font-semibold'>Review Feedback</h2>
            <Summary feedback={resume.feedback} />
            <ATS score={resume.feedback.ATS.score} suggestions={resume.feedback.ATS.tips}/>
            <Details feedback={resume.feedback} />
        </main>
    )
}

export default ResumeFeedback