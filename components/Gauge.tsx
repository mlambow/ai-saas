'use client'

import { useEffect, useRef, useState } from "react";

interface GaugeProps {
    score: number;
}

const Gauge = ({ score = 75 }: GaugeProps) => {
    const [pathLength, setPathLength] = useState(0);
    const pathRef = useRef<SVGPathElement>(null);

    const percentage = Math.min(Math.max(score / 100, 0), 1);

    useEffect(() => {
        if (pathRef.current) {
            setPathLength(pathRef.current.getTotalLength());
        }
    }, []);

    // Gradient and glow colors based on score
    const gradientColor =
        score > 70
            ? { from: "#22c55e", to: "#4ade80", glow: "rgba(34,197,94,0.4)" } // Green
            : score > 49
                ? { from: "#facc15", to: "#fde047", glow: "rgba(250,204,21,0.4)" } // Yellow
                : { from: "#ef4444", to: "#f87171", glow: "rgba(239,68,68,0.4)" }; // Red

    return (
        <div className="flex flex-col items-center justify-center p-4 z-0">
            <div className="relative w-40 h-20 sm:w-48 sm:h-28">
                <svg viewBox="0 0 100 55" className="w-full h-full">
                    <defs>
                        <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor={gradientColor.from} />
                            <stop offset="100%" stopColor={gradientColor.to} />
                        </linearGradient>
                        <filter id="glow">
                            <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor={gradientColor.glow} />
                        </filter>
                    </defs>

                    {/* Background arc */}
                    <path
                        d="M10,50 A40,40 0 0,1 90,50"
                        fill="none"
                        stroke="rgba(100,116,139,0.2)"
                        strokeWidth="10"
                        strokeLinecap="round"
                    />

                    {/* Foreground arc */}
                    <path
                        ref={pathRef}
                        d="M10,50 A40,40 0 0,1 90,50"
                        fill="none"
                        stroke="url(#gaugeGradient)"
                        strokeWidth="10"
                        strokeLinecap="round"
                        strokeDasharray={pathLength}
                        strokeDashoffset={pathLength * (1 - percentage)}
                        filter="url(#glow)"
                        className="transition-all duration-700 ease-out"
                    />
                </svg>

                {/* Center Score */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pt-3 -pb-3">
                    <span className="text-xl md:text-2xl lg:text-3xl font-bold tracking-tight text-slate-800 dark:text-slate-100 drop-shadow-[0_0_8px_rgba(255,255,255,0.15)]">
                        {score}
                    </span>
                    <span className="text-sm font-medium text-slate-500 dark:text-slate-400">/100</span>
                </div>
            </div>
        </div>
    );
};

export default Gauge;
