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
    company_name: string;
    job_title: string;
    job_description: string;
    created_at: string;
    updated_at: string | null;
    user_id: string;
    file?: File;
}

interface ResumeFeedback {
    id: string;
    company_name?: string;
    job_title?: string;
    score: number;
    length?: number;
    updated_at?: string;
    created_at?: string;
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
    file?: File;
}
