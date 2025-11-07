"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {useUser} from "@clerk/nextjs";
import {Resume} from "@/types";
import Link from "next/link";
import Category from "@/components/Category";

export default function ProfileCard({ resume } : {resume :Resume}) {
    const { user } = useUser();
    const firstName = (user?.firstName?.charAt(0).toUpperCase() ?? '') + (user?.firstName?.slice(1) ?? '')
    const lastName = (user?.lastName?.charAt(0).toUpperCase() ?? '') + (user?.lastName?.slice(1) ?? '')
    const fullName = firstName + ' ' + lastName
    const userId = user?.id ?? ''

    const textColor = resume?.feedback?.overallScore! >= 70
        ? 'text-green-500 dark:text-green-400'
        : resume?.feedback?.overallScore! >= 49
            ? 'text-yellow-500 dark:text-yellow-400'
            : 'text-red-500 dark:text-red-400';

    return (
        <Card>
            <div className="flex flex-col items-start gap-4 px-4 py-1.5">
                <div className="flex items-center gap-4 w-full">
                    <img
                        src={user?.imageUrl}
                        alt='User image'
                        className="w-24 h-24 rounded-full object-cover"
                    />
                    <Link href={`/resume/${resume.id}`}>
                        <div className="font-bold text-lg">{fullName}</div>
                        <div className="text-sm text-slate-500">{resume?.job_title}</div>
                        <div className="mt-2">
                            <div className="text-xs text-slate-400">Resume Score <span className='text-[8px] text-slate-500 ml-2'>Latest resume</span>
                            </div>
                            <div className='font-semibold text-2xl'><span className={`${textColor} `}>{resume.feedback?.overallScore}</span> / 100</div>
                        </div>
                    </Link>
                </div>

                {/* Dropdown Menus */}
                <div className="w-full space-y-2">
                    <DropdownSection
                        label="Skill Gaps"
                        items={["Frontend (React)", "System Design", "Alg. Complexity"]}
                    />
                    <DropdownSection
                        label="LinkedIn Integration"
                        items={["Connected", "Sync Profile", "Import Contacts"]}
                    />
                    <DropdownSection
                        label="Career Goals"
                        items={[
                            "Senior Software Engineer",
                            "Staff Engineer",
                            "Product-focused",
                        ]}
                    />
                    <DropdownSection
                        label="Premium Features"
                        items={["Resume Templates", "1:1 Coaching", "Priority Feedback"]}
                    />
                </div>
            </div>
        </Card>
    );
}

/** Reusable dropdown section */
function DropdownSection({
                             label,
                             items,
                         }: {
    label: string;
    items: string[];
}) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="outline"
                    className="w-full flex justify-between items-center"
                >
                    {label}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-full">
                <DropdownMenuLabel>{label}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {items.map((item) => (
                    <DropdownMenuItem key={item}>{item}</DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
