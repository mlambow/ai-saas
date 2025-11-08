"use client";

import { Card } from "@/components/ui/card";
import {useUser} from "@clerk/nextjs";
import {Resume} from "@/types";
import Link from "next/link";

export default function ProfileCard({ resume } : {resume :Resume}) {
    const { user } = useUser();
    const firstName = (user?.firstName?.charAt(0).toUpperCase() ?? '') + (user?.firstName?.slice(1) ?? '')
    const lastName = (user?.lastName?.charAt(0).toUpperCase() ?? '') + (user?.lastName?.slice(1) ?? '')
    const fullName = firstName + ' ' + lastName

    const textColor = resume?.feedback?.overallScore! >= 70
        ? 'text-green-500 dark:text-green-400'
        : resume?.feedback?.overallScore! >= 49
            ? 'text-yellow-500 dark:text-yellow-600'
            : 'text-red-500 dark:text-red-400';

    function capitalizeWords(str: string) {
        return str
            .split(' ')
            .filter(Boolean)
            .map(word => word[0]?.toUpperCase() + word.slice(1).toLowerCase())
            .join(' ');
    }

    return (
        <Card>
            <Link href={`/resume/${resume.id}`} className="flex flex-col items-start gap-4 px-4 py-1.5">
                <div className="flex items-center gap-4 w-full">
                    <img
                        src={user?.imageUrl}
                        alt='User image'
                        className="w-24 h-24 rounded-full object-cover"
                    />
                    <div>
                        <div className="font-bold text-lg">{fullName}</div>
                        <div className="text-sm text-slate-500">{capitalizeWords(resume?.job_title ?? '')}</div>
                        <div className="mt-2">
                            <div className="text-xs text-slate-400">Resume Score <span className='text-[8px] text-slate-500 ml-2'>Best resume</span>
                            </div>
                            <div className='font-semibold text-2xl'><span className={`${textColor} `}>{resume.feedback?.overallScore}</span> / 100</div>
                        </div>
                    </div>
                </div>

                <div className="w-full space-y-2">
                    <div className="min-w-[8rem] flex font-medium cursor-default items-center overflow-hidden justify-between rounded-md border bg-popover px-4 py-2 text-popover-foreground shadow-md">
                        <p className="text-sm">Tone and Style</p>
                        <p className="font-medium text-sm">
                            <span className={`${textColor}`}>{resume.feedback?.toneAndStyle.score}</span>/100
                        </p>
                    </div>

                    <div className="min-w-[8rem] flex font-medium cursor-default items-center overflow-hidden justify-between rounded-md border bg-popover px-4 py-2 text-popover-foreground shadow-md">
                        <p className="text-sm">Content</p>
                        <p className="font-medium text-sm">
                            <span className={`${textColor}`}>{resume.feedback?.content.score}</span>/100
                        </p>
                    </div>

                    <div className="min-w-[8rem] flex font-medium cursor-default items-center overflow-hidden justify-between rounded-md border bg-popover px-4 py-2 text-popover-foreground shadow-md">
                        <p className="text-sm">Structure</p>
                        <p className="font-medium text-sm">
                            <span className={`${textColor}`}>{resume.feedback?.structure.score}</span>/100
                        </p>
                    </div>

                    <div className="min-w-[8rem] flex font-medium cursor-default items-center overflow-hidden justify-between rounded-md border bg-popover px-4 py-2 text-popover-foreground shadow-md">
                        <p className="text-sm">Skills</p>
                        <p className="font-medium text-sm">
                            <span className={`${textColor}`}>{resume.feedback?.skills.score}</span>/100
                        </p>
                    </div>
                </div>
            </Link>
        </Card>
    );
}