import {getResume} from "@/lib/actions/resume.actions";
import {currentUser} from "@clerk/nextjs/server";
import {redirect} from "next/navigation";
import FeedbackPage from "@/components/FeedbackPage";

interface ResumeFeedbackPageProps {
    params: Promise<{ id: string}>;
}

const ResumeFeedback = async ({ params }: ResumeFeedbackPageProps)=> {
    const user = await currentUser()
    if (!user) redirect('/')
    const {id} = await params
    const resume = await getResume(id)

    if (resume?.user_id != user.id) {
        redirect('/dashboard')
    }

    return(
        <main>
            <FeedbackPage resume={resume} />
        </main>
    )
}

export default ResumeFeedback