export interface GetExamsResponse {
    message: "success" | string;
    metadata: ExamsMetadata;
    exams: Exam[];
}

export interface ExamsMetadata {
    currentPage: number;
    numberOfPages: number;
    limit: number;
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
