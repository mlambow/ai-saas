import { cn } from "@/lib/utils";

const ATS = ({
                 score,
                 suggestions,
             }: {
    score: number;
    suggestions: { type: "good" | "improve"; tip: string }[];
}) => {
    // Determine gradient and glow colors based on score
    const colorTheme =
        score > 69
            ? {
                from: "from-green-100 dark:from-emerald-900/30",
                via: "via-green-50 dark:via-emerald-800/20",
                to: "to-white dark:to-slate-900",
                glow: "text-green-500 drop-shadow-[0_0_6px_rgba(34,197,94,0.6)]",
            }
            : score > 49
                ? {
                    from: "from-yellow-100 dark:from-yellow-900/30",
                    via: "via-yellow-50 dark:via-yellow-800/20",
                    to: "to-white dark:to-slate-900",
                    glow: "text-yellow-500 drop-shadow-[0_0_6px_rgba(250,204,21,0.6)]",
                }
                : {
                    from: "from-red-100 dark:from-red-900/30",
                    via: "via-red-50 dark:via-red-800/20",
                    to: "to-white dark:to-slate-900",
                    glow: "text-red-500 drop-shadow-[0_0_6px_rgba(239,68,68,0.6)]",
                };

    return (
        <div
            className={cn(
                "w-full max-w-3xl rounded-2xl overflow-hidden mb-4 p-8 flex flex-col gap-5 transition-all duration-500",
                "border border-slate-200 dark:border-slate-700",
                "shadow-[0_4px_20px_rgba(0,0,0,0.06)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.4)]",
                "hover:shadow-[0_6px_28px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_6px_32px_rgba(0,0,0,0.5)]",
                `bg-gradient-to-br ${colorTheme.from} ${colorTheme.via} ${colorTheme.to}`
            )}
        >
            {/* Header */}
            <div className="flex flex-row gap-4 items-center">
                <img
                    src={
                        score > 69
                            ? "/icons/ats-good.svg"
                            : score > 49
                                ? "/icons/ats-warning.svg"
                                : "/icons/ats-bad.svg"
                    }
                    alt="ATS"
                    className="w-10 h-10"
                />
                <h2
                    className={cn(
                        "text-lg font-semibold text-slate-800 dark:text-slate-100 transition-all duration-300",
                        colorTheme.glow
                    )}
                >
                    ATS Score – {score}/100
                </h2>
            </div>

            {/* Description */}
            <div className="flex flex-col gap-3">
                <p className="font-medium text-lg text-slate-800 dark:text-slate-100">
                    How well does your resume pass through Applicant Tracking Systems?
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                    Your resume was scanned like an employer would. Here's how it performed:
                </p>

                {/* Suggestions */}
                {suggestions.map((suggestion, index) => (
                    <div
                        className="flex flex-row gap-2"
                        key={index}
                    >
                        <img
                            src={
                                suggestion.type === "good"
                                    ? "/icons/check.svg"
                                    : "/icons/warning.svg"
                            }
                            alt="ATS"
                            className={cn(
                                "w-4 h-4 transition-all duration-300",
                                suggestion.type === "good"
                                    ? "brightness-110"
                                    : "brightness-95 opacity-90"
                            )}
                        />
                        <p className="text-base text-slate-600 dark:text-slate-400">
                            {suggestion.tip}
                        </p>
                    </div>
                ))}

                {/* Footer note */}
                <p className="pt-2 text-sm text-slate-600 dark:text-slate-400">
                    Want a better score? Improve your resume by applying the suggestions listed above.
                </p>
            </div>
        </div>
    );
};

export default ATS;
