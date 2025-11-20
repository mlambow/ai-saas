'use server'

import ResumeForm from "@/components/ResumeForm";
import {getResume} from "@/lib/actions/resume.actions";

interface ResumeEditPageProps {
    params: Promise<{ id: string}>;
}

export default async function ResumeEditPage ({params}: ResumeEditPageProps) {
    const { id } = await params;
    const resume = await getResume(id);
    return (
        <main>
            <ResumeForm resume={resume} />
        </main>
    )
}
