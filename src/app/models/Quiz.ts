export enum QuesViewMode {
    INSTRUCTIONS,
    QUESTIONS,
    END
}


export interface QuizEntry {
    Name: string;
    Email: string;
    SelectedLanguage: string;
    QuestionEntry: QuizQuestionEntry[];
}

export interface QuizQuestionEntry {
    Id: string;
    SelectedAnswer: string;
}

export const DEFAULT_SCORE = 1;
