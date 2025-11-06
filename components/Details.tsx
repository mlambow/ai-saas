import { cn } from "@/lib/utils";
import {
    Accordion,
    AccordionContent,
    AccordionHeader,
    AccordionItem,
} from "./Accordion";

const ScoreBadge = ({ score }: { score: number }) => {
    return (
        <div
            className={cn(
                "flex flex-row gap-1 items-center px-2 py-0.5 rounded-[96px]",
                score > 69
                    ? 'text-green-500 dark:text-green-400'
                    : score > 39
                        ? "text-yellow-500 dark:text-yellow-400"
                        : "text-red-500 dark:text-red-400"
            )}
        >
            <img
                src={score > 69 ? "/icons/check.svg" : "/icons/warning.svg"}
                alt="score"
                className="size-4"
            />
            <p
                className={cn(
                    "text-sm font-medium",
                    score > 69
                        ? "text-badge-green-text"
                        : score > 39
                            ? "text-badge-yellow-text"
                            : "text-badge-red-text"
                )}
            >
                {score}/100
            </p>
        </div>
    );
};

const CategoryHeader = ({
                            title,
                            categoryScore,
                        }: {
    title: string;
    categoryScore: number;
}) => {
    return (
        <div className="flex flex-row gap-4 items-center py-2">
            <p className="text-xl font-semibold text-slate-800 dark:text-slate-100">{title}</p>
            <ScoreBadge score={categoryScore} />
        </div>
    );
};

const CategoryContent = ({
                             tips,
                         }: {
    tips: { type: "good" | "improve"; tip: string; explanation: string }[];
}) => {
    return (
        <div className="flex flex-col gap-4 items-center w-full">
            <div className="bg-gradient-to-br from-slate-100 to-slate-200
      dark:from-slate-800 dark:to-slate-900 w-full rounded-lg px-5 py-4 sm:grid sm:grid-cols-2 gap-4 flex flex-col">
                {tips.map((tip, index) => (
                    <div className="flex flex-row gap-2 items-center" key={index}>
                        <img
                            src={
                                tip.type === "good" ? "/icons/check.svg" : "/icons/warning.svg"
                            }
                            alt="score"
                            className="size-5"
                        />
                        <p className="text-base text-slate-800 dark:text-slate-100">{tip.tip}</p>
                    </div>
                ))}
            </div>
            <div className="flex flex-col gap-4 w-full">
                {tips.map((tip, index) => (
                    <div
                        key={index + tip.tip}
                        className={cn(
                            "flex flex-col gap-2 rounded-2xl p-4",
                            tip.type === "good"
                                ? "bg-gradient-to-br from-green-100 dark:from-emerald-900/30 via-green-50 dark:via-emerald-800/20 to-white dark:to-slate-900 border border-emerald-800/20 text-green-500"
                                : "bg-gradient-to-br from-yellow-100 dark:from-yellow-900/30 via-yellow-50 dark:via-yellow-800/20 to-white dark:to-slate-900 border border-yellow-800/20 text-yellow-700"
                        )}
                    >
                        <div className="flex flex-row gap-2 items-center">
                            <img
                                src={
                                    tip.type === "good"
                                        ? "/icons/check.svg"
                                        : "/icons/warning.svg"
                                }
                                alt="score"
                                className="size-5"
                            />
                            <p className="text-base font-semibold">{tip.tip}</p>
                        </div>
                        <p className="text-base">{tip.explanation}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

const Details = ({ feedback }: { feedback: Feedback }) => {
    return (
        <div className="flex flex-row items-center justify-between
      w-full max-w-3xl rounded-2xl p-5 mb-4
      bg-gradient-to-br from-slate-100 to-slate-200
      dark:from-slate-800 dark:to-slate-900
      shadow-[0_4px_20px_rgba(0,0,0,0.15)]
      dark:shadow-[0_4px_25px_rgba(0,0,0,0.5)]
       hover:shadow-[0_8px_30px_rgba(0,0,0,0.2)]
      dark:hover:shadow-[0_8px_40px_rgba(0,0,0,0.6)]">
            <Accordion>
                <AccordionItem id="tone-style">
                    <AccordionHeader itemId="tone-style">
                        <CategoryHeader
                            title="Tone & Style"
                            categoryScore={feedback.toneAndStyle.score}
                        />
                    </AccordionHeader>
                    <AccordionContent itemId="tone-style">
                        <CategoryContent tips={feedback.toneAndStyle.tips} />
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem id="content">
                    <AccordionHeader itemId="content">
                        <CategoryHeader
                            title="Content"
                            categoryScore={feedback.content.score}
                        />
                    </AccordionHeader>
                    <AccordionContent itemId="content">
                        <CategoryContent tips={feedback.content.tips} />
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem id="structure">
                    <AccordionHeader itemId="structure">
                        <CategoryHeader
                            title="Structure"
                            categoryScore={feedback.structure.score}
                        />
                    </AccordionHeader>
                    <AccordionContent itemId="structure">
                        <CategoryContent tips={feedback.structure.tips} />
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem id="skills">
                    <AccordionHeader itemId="skills">
                        <CategoryHeader
                            title="Skills"
                            categoryScore={feedback.skills.score}
                        />
                    </AccordionHeader>
                    <AccordionContent itemId="skills">
                        <CategoryContent tips={feedback.skills.tips} />
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    );
};

export default Details;