export interface Question {
  _id?: string;
  LanguageId: string;
  Title: string;
  Description: string;
  Options: QuestionOption;
  Answer: string;
  Score: number;
  SelectedAnswers: string | null | undefined;
  IsActive: boolean;
}

export interface Language {
  Id: string;
  Title: string;
  Questions: Question[];
}

export interface LanguageStructure {
  Name: string;
  Code: string;
}

export interface QuestionOption {
  A: string;
  B: string;
  C: string;
  D: string;
}

export interface SelectedAnswers {
  Id: string;
  Answer: string | null;
}

export interface QuestionsEntry {
  LanguageId: string;
  Title: string;
  Description: string;
  OptionA: string;
  OptionB: string;
  OptionC: string;
  OptionD: string;
  Answer: string;
  Score: number;
}
