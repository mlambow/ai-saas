'use client'

import React, { useState } from 'react';
import { Button } from './ui/button';
import {X, AlignRight, Sun, Moon} from "lucide-react";
import Link from "next/link"
import {cn} from "@/lib/utils";
import {usePathname} from "next/navigation";
import {useTheme} from "next-themes";
import User from "@/components/User";

const Links = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Interview", href: "/interview" },
    { label: "Resume", href: "/resume" }
]

const MobilePanel: React.FC = () => {
    const { theme, setTheme } = useTheme();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const pathname = usePathname()

    const togglePanel = () => {
        setIsOpen(!isOpen);
    };
    const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

    return (
        <div className='flex items-center justify-center'>
            {/* Button to toggle the sliding panel */}
            <Button
                variant={'ghost'}
                size={'icon'}
                onClick={togglePanel}
                className="p-4 rounded-md md:hidden top-3 right-4 cursor-pointer flex items-center justify-center"
            >
                { !isOpen && <AlignRight className="size-6" /> }
            </Button>

            {/* Sliding Panel */}
            <div
                className={`fixed top-0 right-0 h-screen w-full bg-gradient-to-br from-slate-50 to-white dark:from-slate-800 dark:to-slate-900 border border-slate-200 dark:border-slate-700 transform transition-transform ease-in-out ${
                    isOpen ? 'translate-x-0 rounded-l-lg' : 'translate-x-full'
                } md:hidden z-40`}
            >
                <div className="flex flex-col h-full p-4 mt-5 items-center justify-center mx-auto space-y-4">
                    {Links.map(({ label, href }) => (
                        <Link
                            href={href}
                            key={label}
                            onClick={togglePanel}
                            className={cn('text-2xl hover:text-primary',pathname === href && `text-primary font-bold`)}
                        >
                            {label}
                        </Link>
                    ))}

                    <User />

                    <button
                        onClick={toggleTheme}
                        className="flex md:hidden text-gray-700 dark:text-gray-300 items-center text-center space-x-4 cursor-pointer dark:hover:text-primary hover:text-primary"
                        aria-label="Toggle Dark Mode"
                    >
                        <p className='text-xl'>{theme === 'dark' ? 'Switch to light' : 'Switch to dark'}</p>
                        {theme === "dark" ? <Sun className='size-8' /> : <Moon className='size-8'/>}
                    </button>

                    <Button
                        variant={'ghost'}
                        size='lg'
                        onClick={togglePanel}
                        className="p-4 rounded-md md:hidden mt-4 cursor-pointer flex items-center justify-center w-12 h-12"
                    >
                        { isOpen && <X className="size-16" /> }
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default MobilePanel;
