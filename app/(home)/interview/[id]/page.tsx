import Agent from "@/components/Agent";

interface InterviewSessionPageProps {
    params: Promise<{ id: string}>;
}

const InterviewSession = async ({ params }: InterviewSessionPageProps)=> {
    const {id} = await params

    return(
        <main>
            Interview: {id}
            <Agent />
        </main>
    )
}

export default InterviewSession