'use client'

import React, { useState } from 'react';
import { Button } from './ui/button';
import { X, AlignRight, Sun, Moon } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import User from "@/components/User";

const Links = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Interview", href: "/interview" },
    { label: "Resume", href: "/resume" },
];

const MobilePanel: React.FC = () => {
    const { theme, setTheme } = useTheme();
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    const togglePanel = () => setIsOpen(!isOpen);
    const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

    return (
        <div className="flex items-center justify-center">
            {!isOpen && (
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={togglePanel}
                    className="md:hidden p-3 rounded-xl shadow-sm backdrop-blur-sm bg-white/60 dark:bg-black/40"
                >
                    <AlignRight className="size-6" />
                </Button>
            )}

            <div
                className={cn(
                    "fixed inset-0 z-50 transform transition-all duration-300 md:hidden",
                    "backdrop-blur-xl bg-white/50 dark:bg-black/30 border-l border-white/20 dark:border-black/20",
                    isOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
                )}
            >
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={togglePanel}
                    className="absolute top-5 right-5 p-3 rounded-xl bg-white/60 dark:bg-black/40 backdrop-blur-sm shadow-sm"
                >
                    <X className="size-7" />
                </Button>

                <div className="flex flex-col items-center justify-center h-full space-y-8 px-6">
                    <div className="flex flex-col items-center space-y-6 text-center">
                        {Links.map(({ label, href }) => (
                            <Link
                                key={label}
                                href={href}
                                onClick={togglePanel}
                                className={cn(
                                    "text-3xl font-medium transition-colors",
                                    "hover:text-primary",
                                    pathname === href && "text-primary font-semibold"
                                )}
                            >
                                {label}
                            </Link>
                        ))}
                    </div>

                    <div className="pt-4">
                        <User />
                    </div>

                    <button
                        onClick={toggleTheme}
                        aria-label="Toggle Dark Mode"
                        className="flex items-center space-x-3 text-xl mt-4 px-4 py-2 rounded-xl transition-all
                       bg-white/70 dark:bg-black/40 backdrop-blur-md shadow-sm
                       hover:bg-white/90 dark:hover:bg-black/60"
                    >
                        {theme === "dark" ? (
                            <>
                                <Sun className="size-6 text-yellow-400" />
                                <span>Light Mode</span>
                            </>
                        ) : (
                            <>
                                <Moon className="size-6 text-blue-500" />
                                <span>Dark Mode</span>
                            </>
                        )}
                    </button>

                </div>
            </div>
        </div>
    );
};

export default MobilePanel;