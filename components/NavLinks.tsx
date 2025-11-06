'use client'

import Link from "next/link";
import {usePathname} from "next/navigation";
import {cn} from "@/lib/utils";
import { useTheme } from "next-themes"
import {Moon, Sun} from "lucide-react";

const Links = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Interview", href: "/interview" },
    { label: "Resume", href: "/resume" }
]

export default function NavLinks() {
    const { theme, setTheme } = useTheme();
    const pathname = usePathname()

    const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

    return (
        <nav className='relative'>
            <div className='hidden md:flex space-x-4 items-center'>
                <button
                    onClick={toggleTheme}
                    className="hidden md:flex text-gray-700 dark:text-gray-300 cursor-pointer dark:hover:text-primary hover:text-primary"
                    aria-label="Toggle Dark Mode"
                >
                    {theme === "dark" ? <Sun /> : <Moon />}
                </button>
                {Links.map(({ label, href }) => (
                    <Link
                        href={href}
                        key={label}
                        className={cn(pathname === href && `text-primary font-semibold`)}
                    >
                        {label}
                    </Link>
                ))}
            </div>
        </nav>
    );
}