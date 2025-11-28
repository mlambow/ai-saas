import {getUserResume} from "@/lib/actions/resume.actions";
import {currentUser} from "@clerk/nextjs/server";
import {redirect} from "next/navigation";
import ProfileCard from "@/components/ProfileCard";
import ProgressCard from "@/components/ProgressCard";
import SessionTracker from "@/components/SessionTracker";
import TaskCard from "@/components/TaskCard";
import {Plus} from "lucide-react";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import MultiResume from "@/components/MultiResume";
import {toast} from "sonner";

export default async function Dashboard() {
    const user = await currentUser()
    if(!user) redirect('/')
    const resumes = await getUserResume(user.id)
    if (!resumes) {
        toast.error('Unfortunately you have no resumes yet. Create one and get your score');
        return
    }

    const firstName = (user?.firstName?.charAt(0).toUpperCase() ?? '') + (user?.firstName?.slice(1) ?? '')
    const lastName = (user?.lastName?.charAt(0).toUpperCase() ?? '') + (user?.lastName?.slice(1) ?? '')

    const bestResume =
        resumes?.length
            ? resumes.reduce((max, current) =>
                current?.feedback.overallScore > max?.feedback.overallScore ? current : max
            )
            : null;

    return (
        <div className="min-h-screen mx-auto px-12 py-4 max-md:px-4">
            <div className="container mx-auto mt-6">
                <header className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
                    <div className='lg:col-span-2'>
                        <h1 className="text-3xl font-bold">Welcome back, {firstName ?? lastName}</h1>
                        <p className="text-sm mt-1 text-slate-600 dark:text-slate-500">Optimize your career path today</p>
                    </div>
                    <div className={`${!resumes || resumes.length === 0 && 'hidden'} flex items-center justify-end gap-3`}>
                        <Button className='rounded-xl flex-1 dark:hover:bg-secondary-foreground hover:bg-secondary-foreground shadow-[0_4px_20px_rgba(0,0,0,0.15)] dark:shadow-[0_4px_25px_rgba(0,0,0,0.5)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_8px_30px_rgba(0,0,0,0.2)] dark:hover:shadow-[0_8px_40px_rgba(0,0,0,0.6)]'>
                            <Link href='/interview' className="flex items-center justify-center w-full py-4 px-3 dark:hover:text-black">
                                <Plus  className='mr-3'/>
                                Interview
                            </Link>
                        </Button>
                        <Button className='rounded-xl flex-1 bg-secondary-foreground dark:bg-secondary hover:bg-secondary dark:hover:bg-secondary-foreground shadow-[0_4px_20px_rgba(0,0,0,0.15)] dark:shadow-[0_4px_25px_rgba(0,0,0,0.5)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_8px_30px_rgba(0,0,0,0.2)] dark:hover:shadow-[0_8px_40px_rgba(0,0,0,0.6)]'>
                            <Link href='/resume' className="flex items-center justify-center w-full py-4 px-3 hover:text-black">
                                <Plus  className='mr-3'/>
                                Resume
                            </Link>
                        </Button>
                    </div>
                </header>

                {!resumes || resumes.length === 0 ?
                    <div className="flex flex-col items-center justify-center mx-auto h-full w-full gap-3 mt-30">
                        <p className='text-center font-semibold text-xl'>You currently do not have resumes, analyse one and get your feedback and improvement suggestions.</p>
                        <Button className='rounded-xl bg-primary dark:bg-primary hover:bg-secondary-foreground dark:hover:bg-secondary-foreground shadow-[0_4px_20px_rgba(0,0,0,0.15)] dark:shadow-[0_4px_25px_rgba(0,0,0,0.5)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_8px_30px_rgba(0,0,0,0.2)] dark:hover:shadow-[0_8px_40px_rgba(0,0,0,0.6)]'>
                            <Link href='/resume' className="flex items-center justify-center w-full py-4 px-3 hover:text-white dark:hover:text-black">
                                <Plus  className='mr-3'/>
                                Resume
                            </Link>
                        </Button>
                    </div>
                    :
                    <section className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2 space-y-6">
                            <MultiResume resumes={resumes}/>

                            {/*<div className="grid grid-cols-1 md:grid-cols-2 gap-6">*/}
                            {/*    <ProgressCard />*/}
                            {/*    <SessionTracker />*/}
                            {/*</div>*/}
                        </div>

                        <div className="space-y-6">
                            <ProfileCard resume={bestResume} />
                        </div>
                    </section>
                }
            </div>
        </div>
    );
}