export enum QuesViewMode {
    INSTRUCTIONS,
    QUESTIONS,
    END
}


export interface QuizEntry {
    Name: string;
    Email: string;
    SelectedTopic: string;
    QuestionEntry: QuizQuestionEntry[];
}

export interface QuizQuestionEntry {
    Id: string;
    SelectedAnswers: string;
}

export const DEFAULT_SCORE = 1;
