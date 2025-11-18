interface CreateInterview {
    jobTitle: string;
    jobDescription: string;
    numQuestions: number;
    experienceLevel: string;
}

interface AnalayzeResume {
    jobTitle: string;
    jobDescription: string;
    companyName: string;
    file: File;
}

interface User {
    name: string;
    email: string;
    id: string;
}

interface SavedMessage {
    role: "user" | "system" | "assistant";
    content: string;
}

interface Job {
    title: string;
    description: string;
    location: string;
    requiredSkills: string[];
}

interface Resume {
    id: string;
    company_name?: string;
    job_title?: string;
    score: number;
    length?: number;
    feedback?: Feedback;
}

interface Feedback {
    overallScore: number;
    ATS: {
        score: number;
        tips: {
            type: "good" | "improve" | "unsatisfactory";
            tip: string;
        }[];
    };
    toneAndStyle: {
        score: number;
    };
    content: {
        score: number;
        tips: {
            type: "good" | "improve" | "unsatisfactory";
            tip: string;
            explanation: string;
        }[];
    };
    structure: {
        score: number;
    };
    skills: {
        score: number;
        matchedSkills: string[];
        missingSkills: string[];
        tips: {
            type: "good" | "improve" | "unsatisfactory";
            tip: string;
            explanation: string;
        }[];
    };
    experience: {
        analysis: string,
        recommendedMetrics: string[]
    },
    keywords: {
        missingKeywords: string;
        tips: string[];
    };
    summary: {
        alignmentScore: number,
        tips: {
            type: "good" | "improve" | "unsatisfactory";
            explanation: string;
        }[];
    };
    aiSuggestions: {
        improvedSummary: string;
    };
}

interface handleAnalyzeResume {
    companyName: string;
    jobTitle: string;
    jobDescription: string;
    file: File;
}

export interface SafeUser {
    id: string;
    firstName?: string | null;
    lastName?: string | null;
    email?: string | null;
    imageUrl?: string;
}