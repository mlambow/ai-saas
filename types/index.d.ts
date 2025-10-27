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

type FormType = "sign-in" | "sign-up";

interface SignInParams {
    email: string;
    idToken: string;
}

interface SignUpParams {
    uid: string;
    name: string;
    email: string;
    password: string;
}

interface User {
    name: string;
    email: string;
    id: string;
}