import Link from "next/link";
import {Laptop} from "lucide-react";
import NavLinks from "@/components/NavLinks";
import MobilePanel from "@/components/MobilePanel";
import User from "@/components/User";

export default function Navbar() {
    return (
        <nav className="flex items-center justify-between mx-auto w-full px-12 py-4 max-md:px-4">
            <Link href="/" className="flex text-2xl font-semibold items-center hover:text-primary">
                <Laptop size={34} className="text-primary mr-2" />
                Job Ready
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