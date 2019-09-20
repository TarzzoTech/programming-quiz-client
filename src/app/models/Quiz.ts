export enum QuesViewMode {
    INSTRUCTIONS,
    QUESTIONS,
    END
}


export interface QuizEntry {
    Name: string;
    Email: string;
    Score: string;
}

export interface QuizEntryResponse extends QuizEntry {
    Id?: string;
    createdDate?: Date;
}
