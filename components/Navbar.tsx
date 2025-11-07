import Link from "next/link";
import {Laptop} from "lucide-react";
import NavLinks from "@/components/NavLinks";
import MobilePanel from "@/components/MobilePanel";
import User from "@/components/User";

export default function Navbar() {
    return (
        <nav className="flex items-center justify-between mx-auto w-full px-12 py-4 max-md:px-4">
            <Link href='/dashboard' className="flex text-2xl font-semibold items-center hover:text-primary">
                <Laptop size={40} className="text-primary mr-2" />
                <div>
                    <div className="text-lg font-semibold">AI Job Ready</div>
                    <div className="text-xs text-slate-600 dark:text-slate-500">
                        Resume & Interview Optimization
                    </div>
                </div>
            </Link>

            <div className="hidden md:flex items-center space-x-4">
                <NavLinks />
                <User />
            </div>
            <div className='flex md:hidden items-center'>
                <MobilePanel />
            </div>
        </nav>
    )
}