import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function capitalizeWords(str: string) {
    return str
        .split(' ')
        .filter(Boolean)
        .map(word => word[0]?.toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
}

export const getTextColor = (score: number) => {
    if (score >= 75) return 'text-green-500 dark:text-green-400'
    if (score >= 49) return 'text-yellow-500 dark:text-yellow-600'
    return 'text-red-500 dark:text-red-400'
}