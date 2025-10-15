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
    const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");
    const pathname = usePathname()
    return (
        <div className={cn(`flex space-x-4`)}>
            {Links.map(({ label, href }) => (
                <Link
                    href={href}
                    key={label}
                    className={cn(pathname === href && `text-primary font-semibold underline-offset-4`)}
                >
                    {label}
                </Link>
            ))}
            <button
                onClick={toggleTheme}
                className="text-gray-700 dark:text-gray-300 cursor-pointer dark:hover:text-primary hover:text-primary"
                aria-label="Toggle Dark Mode"
            >
                {theme === "dark" ? <Sun /> : <Moon />}
            </button>
        </div>
    );
}