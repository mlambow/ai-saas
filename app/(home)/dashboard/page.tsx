import {getUserResume} from "@/lib/actions/resume.actions";
import {currentUser} from "@clerk/nextjs/server";
import {redirect} from "next/navigation";
import MetricRow from "@/components/MetricRow";
import ProfileCard from "@/components/ProfileCard";
import ProgressCard from "@/components/ProgressCard";
import SessionTracker from "@/components/SessionTracker";
import TaskCard from "@/components/TaskCard";
import {Plus} from "lucide-react";
import {Button} from "@/components/ui/button";
import Link from "next/link";

export default async function Dashboard() {
    const user = await currentUser()
    if(!user) redirect('/')
    const resumes = await getUserResume(user.id)

    const firstName = (user?.firstName?.charAt(0).toUpperCase() ?? '') + (user?.firstName?.slice(1) ?? '')
    const lastName = (user?.lastName?.charAt(0).toUpperCase() ?? '') + (user?.lastName?.slice(1) ?? '')

    const bestResume = resumes.reduce((max, current) => {
        return current?.feedback.overallScore > max?.feedback.overallScore ? current : max;
    });

    console.log(bestResume)

    return (
        <div className="min-h-screen mx-auto px-12 py-4 max-md:px-4">
            <div className="container mx-auto mt-6">
                <header className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
                        <div className='lg:col-span-2'>
                            <h1 className="text-3xl font-bold">Welcome back, {firstName ?? lastName}</h1>
                            <p className="text-sm mt-1 text-slate-600 dark:text-slate-500">Optimize your career path today</p>
                        </div>
                        <div className="flex items-center justify-end gap-3">
                            <Button className='rounded-xl flex-1 dark:hover:bg-secondary-foreground hover:bg-secondary-foreground shadow-[0_4px_20px_rgba(0,0,0,0.15)] dark:shadow-[0_4px_25px_rgba(0,0,0,0.5)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_8px_30px_rgba(0,0,0,0.2)] dark:hover:shadow-[0_8px_40px_rgba(0,0,0,0.6)]'>
                                <Link href='/interview' className="flex items-center justify-center w-full py-4 px-3 dark:hover:text-black">
                                    <Plus  className='mr-3'/>
                                    Interview
                                </Link>
                            </Button>
                            <Button className='rounded-xl flex-1 bg-secondary-foreground dark:bg-secondary hover:bg-secondary dark:hover:bg-primary shadow-[0_4px_20px_rgba(0,0,0,0.15)] dark:shadow-[0_4px_25px_rgba(0,0,0,0.5)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_8px_30px_rgba(0,0,0,0.2)] dark:hover:shadow-[0_8px_40px_rgba(0,0,0,0.6)]'>
                                <Link href='/resume' className="flex items-center justify-center w-full py-4 px-3 hover:text-black dark:hover:text-white">
                                    <Plus  className='mr-3'/>
                                    Resume
                                </Link>
                            </Button>
                        </div>

                </header>

                <section className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                        <MetricRow />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <ProgressCard />
                            <SessionTracker />
                        </div>
                    </div>

                    <div className="space-y-6">
                        <ProfileCard resume={bestResume} />
                        <TaskCard />
                    </div>
                </section>
            </div>
        </div>
    );
}