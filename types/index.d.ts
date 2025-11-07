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
    companyName?: string;
    job_title?: string;
    score: number;
    feedback?: Feedback;
}

interface Feedback {
    overallScore: number;
    ATS: {
        score: number;
        tips: {
            type: "good" | "improve";
            tip: string;
        }[];
    };
    toneAndStyle: {
        score: number;
        tips: {
            type: "good" | "improve";
            tip: string;
            explanation: string;
        }[];
    };
    content: {
        score: number;
        tips: {
            type: "good" | "improve";
            tip: string;
            explanation: string;
        }[];
    };
    structure: {
        score: number;
        tips: {
            type: "good" | "improve";
            tip: string;
            explanation: string;
        }[];
    };
    skills: {
        score: number;
        tips: {
            type: "good" | "improve";
            tip: string;
            explanation: string;
        }[];
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