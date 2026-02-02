export interface GetQuestionsResponse {
    message: string; // "success"
    questions: Question[];
}

export type QuestionType = "single_choice" | string;

export interface Question {
    _id: string;
    question: string;
    answers: Answer[];
    type: QuestionType;
    correct: string; // e.g. "A1" | "A2" ...
    subject: string | null;
    exam: Exam;
    createdAt: string; // ISO date string
}

export interface Answer {
    answer: string;
    key: string; // e.g. "A1" | "A2" ...
}

export interface Exam {
    _id: string;
    title: string;
    duration: number;
    subject: string;
    numberOfQuestions: number;
    active: boolean;
    createdAt: string; // ISO date string
}
