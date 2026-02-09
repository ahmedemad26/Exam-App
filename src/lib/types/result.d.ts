// Answer Options Type (can be expanded if you have a specific structure)
interface AnswerOptions {
    [key: string]: string; // Example: { "A1": "text", "A2": "text" }
}
// Wrong Question
interface WrongQuestion {
    QID: string;
    Question: string;
    inCorrectAnswer: string;
    correctAnswer: string;
    answers: AnswerOptions;
}

// Correct Question
interface CorrectQuestion {
    QID: string;
    Question: string;
    correctAnswer: string;
    answers: AnswerOptions;
}

// Main response
export interface QuizResultResponse {
    message: string; // "success"
    correct: number; // Number of correct answers
    wrong: number; // Number of wrong answers
    total: string; // "10%" or percentage as text
    WrongQuestions: WrongQuestion[];
    correctQuestions: CorrectQuestion[];
}
