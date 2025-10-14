import Link from "next/link";
import {Laptop} from "lucide-react";
import NavLinks from "@/components/NavLinks";

export default function Navbar() {
    return (
        <nav className="flex items-center justify-between mx-auto w-full px-12 py-4 max-sm:px-4">
            <Link href="/" className="flex text-2xl font-semibold items-center hover:underline hover:underline-offset-8">
                <Laptop size={34} className="text-primary mr-2" />
                Job Ready
            </Link>

            <div className="flex items-center space-x-4">
                <NavLinks />
                <h1>Sign In</h1>
            </div>
        </nav>
    )
}