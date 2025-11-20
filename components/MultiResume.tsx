"use client";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { toast } from 'sonner'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";

import {
    FileText, Eye,
    Pencil, Trash2,
    BadgeCheck, Feather, BookOpenText, ListTree,
} from "lucide-react";
import {ResumeFeedback} from '@/types'
import {capitalizeWords} from "@/lib/utils";
import { deleteResume } from '@/lib/actions/resume.actions'
import Link from "next/link";
import {useState} from "react";

export default function MultiResume({ resumes }: { resumes: ResumeFeedback[] }) {
    const [open, setOpen] = useState<boolean>(false)
    return (
        <div className="max-w-6xl mx-auto space-y-6">
            {/* SCROLLABLE RESUME LIST */}
            <Card className="rounded-2xl shadow-md">
                <CardHeader>
                    <CardTitle className="text-xl">
                        All Resumes ({resumes.length})
                    </CardTitle>
                </CardHeader>

                <CardContent>
                    <ScrollArea className="h-[350px] rounded-lg  ">
                        <Accordion type="multiple" className="space-y-4">

                            {resumes.map((resume) => (
                                <AccordionItem
                                    key={resume.id}
                                    value={`resume-${resume.id}`}
                                    className=""
                                >
                                    {/* ------------------ RESUME HEADER ------------------ */}
                                    <AccordionTrigger className="text-sm sm:text-base md:text-lg font-semibold flex justify-between">
                                        <div className="flex items-center gap-2">
                                            <FileText className="h-5 w-5 text-blue-600" />
                                            {capitalizeWords(resume.job_title ?? '')}
                                        </div>
                                    </AccordionTrigger>

                                    {/* ------------------ RESUME CONTENT ------------------ */}
                                    <AccordionContent>
                                        <div className="p-2 space-y-4">
                                            <p>Company Name: <span className='font-semibold'>{resume.company_name}</span></p>

                                            {/* SCORES GRID */}
                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                                {/* TONE & STYLE */}
                                                <Card className="rounded-xl shadow-sm">
                                                    <CardHeader>
                                                        <CardTitle className="flex items-center gap-2">
                                                            <Feather className="h-4 w-4 text-blue-600" />
                                                            Tone & Style
                                                        </CardTitle>
                                                    </CardHeader>
                                                    <CardContent>
                                                        <div className="text-3xl font-bold">
                                                            {resume.feedback?.toneAndStyle.score}%
                                                        </div>
                                                        <Progress value={resume.feedback?.toneAndStyle.score} />
                                                    </CardContent>
                                                </Card>

                                                {/* CONTENT */}
                                                <Card className="rounded-xl shadow-sm">
                                                    <CardHeader className="">
                                                        <CardTitle className="flex items-center gap-2 text-base">
                                                            <BookOpenText className="h-4 w-4 text-green-600" />
                                                            Content
                                                        </CardTitle>
                                                    </CardHeader>
                                                    <CardContent>
                                                        <div className="text-3xl font-bold">
                                                            {resume.feedback?.content.score}%
                                                        </div>
                                                        <Progress value={resume.feedback?.content.score} />
                                                    </CardContent>
                                                </Card>

                                                {/* STRUCTURE */}
                                                <Card className="rounded-xl shadow-sm">
                                                    <CardHeader className="">
                                                        <CardTitle className="flex items-center gap-2 text-base">
                                                            <ListTree className="h-4 w-4 text-orange-600" />
                                                            Structure
                                                        </CardTitle>
                                                    </CardHeader>
                                                    <CardContent>
                                                        <div className="text-3xl font-bold">
                                                            {resume.feedback?.structure.score}%
                                                        </div>
                                                        <Progress value={resume.feedback?.structure.score} />
                                                    </CardContent>
                                                </Card>

                                                {/*SKILLS*/}
                                                <Card className="shadow-md rounded-2xl">
                                                    <CardHeader>
                                                        <CardTitle className="flex items-center gap-2">
                                                            <BadgeCheck className="h-5 w-5 text-purple-600" />
                                                            Skills
                                                        </CardTitle>
                                                    </CardHeader>
                                                    <CardContent>
                                                        <div className="text-4xl font-bold">{resume.feedback?.skills.score}%</div>
                                                        <Progress value={resume.feedback?.skills.score} className="h-2" />
                                                    </CardContent>
                                                </Card>
                                            </div>

                                            {/* ACTION BUTTONS */}
                                            <div className="flex gap-3 pt-2">
                                                <Button asChild className="flex gap-2">
                                                    <Link href={`/resume/${resume.id}`}>
                                                        <Eye className="h-4 w-4" />
                                                        View Full Analysis
                                                    </Link>
                                                </Button>

                                                <Button asChild variant="secondary" className="flex gap-2">
                                                    <Link href={`/resume/edit/${resume.id}`}>
                                                        <Pencil className="h-4 w-4" />
                                                        Update Resume
                                                    </Link>
                                                </Button>

                                                <Dialog open={open} onOpenChange={setOpen}>
                                                    <DialogTrigger asChild>
                                                        <Button
                                                            variant="destructive"
                                                            className="flex gap-2 cursor-pointer"
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                            Delete
                                                        </Button>
                                                    </DialogTrigger>

                                                    <DialogContent className="sm:max-w-md">
                                                        <DialogHeader>
                                                            <DialogTitle>Are you sure?</DialogTitle>
                                                            <DialogDescription>
                                                                You are about to remove your resume from our database. This action cannot be undone.
                                                            </DialogDescription>
                                                        </DialogHeader>

                                                        <DialogFooter>
                                                            <DialogClose asChild>
                                                                <Button type="button" variant="secondary" className='cursor-pointer'>
                                                                    Cancel
                                                                </Button>
                                                            </DialogClose>

                                                            <Button
                                                                variant="destructive"
                                                                className='cursor-pointer'
                                                                onClick={async () => {
                                                                    const result = await deleteResume(resume.id);

                                                                    if (result) {

                                                                        toast.success("Resume deleted successfully");
                                                                    } else {
                                                                        toast.error("Failed to delete resume");
                                                                    }
                                                                    setOpen(false);
                                                                }}
                                                            >
                                                                Yes, Delete
                                                            </Button>
                                                        </DialogFooter>
                                                    </DialogContent>
                                                </Dialog>

                                            </div>

                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            ))}

                        </Accordion>
                    </ScrollArea>
                </CardContent>
            </Card>
        </div>
    );
}
