import Gauge from "./Gauge";
import ScoreBadge from "./ScoreBadge";


const Category = ({ title, score }: { title: string; score: number }) => {
    const textColor = score > 70
        ? 'text-green-500 dark:text-green-400'
        : score > 49
            ? 'text-yellow-500 dark:text-yellow-400'
            : 'text-red-500 dark:text-red-400';
    return (
        <div className="flex flex-row items-center justify-center p-2 gap-2">
            <div className="flex flex-row items-center justify-between
      w-full max-w-2xl rounded-2xl p-5
      bg-gradient-to-br from-slate-100 to-slate-200
      dark:from-slate-800 dark:to-slate-900
      shadow-[0_4px_20px_rgba(0,0,0,0.15)]
      dark:shadow-[0_4px_25px_rgba(0,0,0,0.5)]
      transition-all duration-300
      hover:scale-[1.02] hover:shadow-[0_8px_30px_rgba(0,0,0,0.2)]
      dark:hover:shadow-[0_8px_40px_rgba(0,0,0,0.6)]">
                <div className="flex flex-row items-center justify-center space-x-1.5 sm:space-x-3">
                    <p className="text-lg sm:text-xl font-semibold text-slate-800 dark:text-slate-100">{title}</p>
                    <ScoreBadge score={score} />
                </div>
                <p className="text-xl">
                    <span className={`${textColor} animate-[pulse-glow_2s_ease-in-out_infinite]`}>{score}</span>/100
                </p>
            </div>
        </div>
    );
}

const Summary = ({ feedback } : {feedback :Feedback}) => {
    return (
        <div className="max-w-3xl w-full rounded-2xl overflow-hidden bg-gradient-to-br from-slate-50 to-white dark:from-slate-800 dark:to-slate-900 border border-slate-200 dark:border-slate-700 shadow-[0_4px_20px_rgba(0,0,0,0.06)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.4)] transition-all duration-300 hover:shadow-[0_6px_28px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_6px_32px_rgba(0,0,0,0.5)]">
            <div className="flex sm:flex-row flex-col items-center p-4 gap-6">
                <Gauge score={feedback.overallScore} />

                <div className="flex flex-col gap-2">
                    <h2 className="font-semibold sm:text-start">Resume Score</h2>
                    <p className="text-sm sm:text-start text-gray-500">This score is calculated based on the variables listed below:</p>
                </div>
            </div>
            <div className='flex flex-col px-4 mb-8'>
                <Category title='Tone & Style' score={feedback.toneAndStyle?.score}/>
                <Category title='Content' score={feedback.content?.score}/>
                <Category title='Structure' score={feedback.structure?.score}/>
                <Category title='Skills' score={feedback.skills?.score}/>
            </div>
        </div>

    )
}

export default Summary