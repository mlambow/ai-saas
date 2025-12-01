interface InterviewSessionPageProps {
    params: Promise<{ id: string}>;
}

const InterviewSession = async ({ params }: InterviewSessionPageProps)=> {
    const {id} = await params

    return(
        <main>
            Interview: {id}
        </main>
    )
}

export default InterviewSession