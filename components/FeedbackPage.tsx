"use client";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
    FileText,
    Gauge,
    BadgeCheck,
    Briefcase,
    ListChecks,
    AlignLeft,
    Sparkles,
    Feather,
    BookOpenText,
    ListTree
} from "lucide-react";
import {capitalizeWords} from "@/lib/utils";

export default function FeedbackPage({resume}: {resume: ResumeFeedback}) {
    return (
        <div className="max-w-6xl mx-auto px-6 py-4 space-y-8">
            {/* --------------------- HEADER --------------------- */}
            <div className="flex flex-col gap-2">
                <h1 className="text-2xl md:text-3xl font-bold">Resume Analysis: {capitalizeWords(resume.job_title ?? '')}</h1>
                <p className="text-muted-foreground ">
                    Here's a detailed breakdown of how your resume performs.
                </p>
            </div>

            {/* ---------------------- TOP CARDS ---------------------- */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="shadow-md rounded-2xl">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Feather className="h-5 w-5 text-blue-600" />
                            Tone & Style
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-bold mb-2">{resume.feedback?.toneAndStyle.score}%</div>
                        <Progress value={resume.feedback?.toneAndStyle.score} className="h-2" />
                    </CardContent>
                </Card>

                <Card className="shadow-md rounded-2xl">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <BookOpenText className="h-5 w-5 text-green-600" />
                            Content
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-bold mb-2">{resume.feedback?.content.score}%</div>
                        <Progress value={resume.feedback?.content.score} className="h-2" />
                    </CardContent>
                </Card>

                <Card className="shadow-md rounded-2xl">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <ListTree className="h-5 w-5 text-yellow-600" />
                            Structure
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-bold mb-2">{resume.feedback?.structure.score}%</div>
                        <Progress value={resume.feedback?.structure.score} className="h-2" />
                    </CardContent>
                </Card>

                <Card className="shadow-md rounded-2xl">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <BadgeCheck className="h-5 w-5 text-purple-600" />
                            Skills
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-bold mb-2">{resume.feedback?.skills.score}%</div>
                        <Progress value={resume.feedback?.skills.score} className="h-2" />
                    </CardContent>
                </Card>
            </div>

            {/* --------------------- ACCORDION ---------------------- */}
            <Accordion type="single" collapsible className="space-y-4">

                {/* 0. ATS */}
                <AccordionItem value="ats">
                    <AccordionTrigger className="text-lg font-semibold">
                        <div className="flex items-center gap-2">
                            <Gauge className="h-5 w-5 text-sky-600" />
                            ATS
                        </div>
                    </AccordionTrigger>
                    <AccordionContent>
                        <p className="text-muted-foreground">
                            Your resume aligns <strong>{resume.feedback?.ATS.score}%</strong> with the job description.
                            Improving your resume summary and adding missing keywords can boost
                            this score.
                        </p>
                        <ul className="list-disc ml-6 space-y-2">
                            {resume.feedback?.ATS.tips.map((item) => (
                                <li
                                    key={item.tip}
                                    className={
                                        item.type === "good"
                                            ? "marker:text-green-600"
                                            : item.type === "improve"
                                                ? "marker:text-yellow-600"
                                                : "marker:text-red-600"
                                    }
                                >
                                    {item.tip}
                                </li>
                            ))}
                        </ul>

                    </AccordionContent>
                </AccordionItem>

                {/* 1. SUMMARY */}
                <AccordionItem value="summary">
                    <AccordionTrigger className="text-lg font-semibold">
                        <div className="flex items-center gap-2">
                            <FileText className="h-5 w-5 text-cyan-600" />
                            Resume Summary
                        </div>
                    </AccordionTrigger>
                    <AccordionContent>
                        <ul className="list-disc ml-6 space-y-2">
                            {resume.feedback?.summary?.tips.map((item) => (
                                <li
                                    key={item.explanation}
                                    className={
                                        item.type === "good"
                                            ? "marker:text-green-600"
                                            : item.type === "improve"
                                                ? "marker:text-yellow-600"
                                                : "marker:text-red-600"
                                    }
                                >
                                    {item.explanation}
                                </li>
                            ))}
                        </ul>
                    </AccordionContent>
                </AccordionItem>

                {/* 2. SKILLS MATCH */}
                <AccordionItem value="skills">
                    <AccordionTrigger className="text-lg font-semibold">
                        <div className="flex items-center gap-2">
                            <ListChecks className="h-5 w-5 text-emerald-600" />
                            Skills Match Breakdown
                        </div>
                    </AccordionTrigger>
                    <AccordionContent>
                        <div className="space-y-3">
                            <p>
                                <strong>Matched Skills:</strong> {resume.feedback?.skills.matchedSkills?.length
                                ? resume.feedback.skills.matchedSkills.join(", ")
                                : "None"}
                            </p>
                            <p>
                                <strong>Missing Skills:</strong>{" "}
                                <span className="text-red-600">{resume.feedback?.skills.missingSkills?.length
                                    ? resume.feedback.skills.missingSkills.join(", ")
                                    : "None"}</span>
                            </p>
                            <p className="text-muted-foreground">
                                Adding the missing skills above can improve your ATS score.
                            </p>
                        </div>
                    </AccordionContent>
                </AccordionItem>

                {/* 3. EXPERIENCE */}
                <AccordionItem value="experience">
                    <AccordionTrigger className="text-lg font-semibold">
                        <div className="flex items-center gap-2">
                            <Briefcase className="h-5 w-5 text-orange-600" />
                            Experience Analysis
                        </div>
                    </AccordionTrigger>
                    <AccordionContent>
                        <p>
                            Your experience is relevant but lacks quantifiable achievements.
                            Consider adding metrics such as:
                        </p>
                        <ul className="list-disc ml-6 space-y-2">
                            {resume.feedback?.experience?.recommendedMetrics.map((item) => (
                                <li key={item}>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </AccordionContent>
                </AccordionItem>

                {/* 4. KEYWORD OPTIMIZATION */}
                <AccordionItem value="keywords">
                    <AccordionTrigger className="text-lg font-semibold">
                        <div className="flex items-center gap-2">
                            <AlignLeft className="h-5 w-5 text-yellow-600" />
                            Keyword Optimization
                        </div>
                    </AccordionTrigger>
                    <AccordionContent>
                        <p className='mb-4'>
                            Missing keywords detected from job description:
                            <span className="text-red-600 font-medium">
                                {" "}
                                {resume.feedback?.keywords?.missingKeywords}
                            </span>
                        </p>
                        <ul className='list-disc ml-4 space-y-2'>
                            {resume.feedback?.keywords?.tips.map((item) => (
                                <li key={item}>{item}</li>
                            ))}
                        </ul>
                    </AccordionContent>
                </AccordionItem>

                {/* 5. CONTENT */}
                <AccordionItem value="content">
                    <AccordionTrigger className="text-lg font-semibold">
                        <div className="flex items-center gap-2">
                            <BookOpenText className="h-5 w-5 text-indigo-700" />
                            Resume Content
                        </div>
                    </AccordionTrigger>
                    <AccordionContent>
                        <ul className="list-disc ml-6 space-y-2">
                            {resume.feedback?.content?.tips.map((item) => (
                                <li
                                    key={item.explanation}
                                    className={
                                        item.type === "good"
                                            ? "marker:text-green-600"
                                            : item.type === "improve"
                                                ? "marker:text-yellow-600"
                                                : "marker:text-red-600"
                                    }
                                >
                                    {item.explanation}
                                </li>
                            ))}
                        </ul>
                    </AccordionContent>
                </AccordionItem>

                {/* 6. AI SUGGESTIONS */}
                <AccordionItem value="ai-suggestions">
                    <AccordionTrigger className="text-lg font-semibold">
                        <div className="flex items-center gap-2">
                            <Sparkles className="h-5 w-5 text-purple-600" />
                            AI Resume Suggestions
                        </div>
                    </AccordionTrigger>
                    <AccordionContent>
                        <p className="font-medium mb-2">Improved Resume Summary:</p>
                        <div className="p-4 border rounded-xl bg-muted/30">
                            <p>
                                “{resume.feedback?.aiSuggestions?.improvedSummary}”
                            </p>
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    );
}
