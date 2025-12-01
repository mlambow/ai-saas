"use client";

import { Card } from "@/components/ui/card";
import {useUser} from "@clerk/nextjs";
import Link from "next/link";
import {capitalizeWords, getTextColor} from "@/lib/utils";

export default function ProfileCard({ resume } : {resume :ResumeFeedback}) {
    const { user } = useUser();
    const firstName = (user?.firstName?.charAt(0).toUpperCase() ?? '') + (user?.firstName?.slice(1) ?? '')
    const lastName = (user?.lastName?.charAt(0).toUpperCase() ?? '') + (user?.lastName?.slice(1) ?? '')
    const fullName = firstName + ' ' + lastName

    const score = Number(resume?.feedback?.overallScore ?? -1);
    const textColor =
        score > 75
            ? 'text-green-500 dark:text-green-400'
            : score > 49
                ? 'text-yellow-500 dark:text-yellow-600'
                : 'text-red-500 dark:text-red-400';

    const sections = resume?.feedback
        ? [
            { name: "ATS", score: resume.feedback.ATS.score },
            { name: "Tone and Style", score: resume.feedback.toneAndStyle.score },
            { name: "Content", score: resume.feedback.content.score },
            { name: "Structure", score: resume.feedback.structure.score },
            { name: "Skills", score: resume.feedback.skills.score },
        ]
        : [];

    console.log(user)
    return (
        <Card className={`${!resume && 'hidden'}`}>
            <Link href={`/resume/${resume?.id}`} className="flex flex-col items-start gap-4 px-4 py-1.5">
                <div className="flex items-center gap-4 w-full">
                    <img
                        src={user?.imageUrl || user?.firstName?.charAt(0)?.toUpperCase()}
                        alt='User image'
                        className="w-24 h-24 rounded-full object-cover"
                    />
                    <div>
                        <div className="font-bold text-lg">{fullName}</div>
                        <div className="text-sm text-slate-500">{capitalizeWords(resume?.job_title ?? '')}</div>
                        <div className="mt-2">
                            <div className="text-xs text-slate-400">Resume Score <span className='text-[8px] text-slate-500 ml-2'>Best resume</span>
                            </div>
                            <div className='font-semibold text-2xl'><span className={`${textColor} `}>{resume?.feedback?.overallScore}</span> / 100</div>
                        </div>
                    </div>
                </div>

                <div className="w-full space-y-2">
                    {sections.map((section) => (
                        <div
                            key={section.name}
                            className="min-w-[8rem] flex font-medium cursor-default items-center overflow-hidden justify-between rounded-md border bg-popover px-4 py-2 text-popover-foreground shadow-md"
                        >
                            <p className="text-sm">{section.name}</p>
                            <p className="font-medium text-sm">
                                <span className={`${getTextColor(section.score)} mr-0.5`}>
                                    {section.score}
                                </span>/100
                            </p>
                        </div>
                    ))}
                </div>
            </Link>
        </Card>
    );
}