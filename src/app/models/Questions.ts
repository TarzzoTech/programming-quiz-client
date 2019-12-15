export interface Question {
  Id?: string;
  TopicId: string;
  Title: string;
  Description: string;
  Options: QuestionOption;
  Answer?: string;
  Score: number;
  SelectedAnswers: string | null | undefined;
  IsActive: boolean;
}

export interface TopicItem {
  Id: string;
  Title: string;
  Questions: Question[];
}

export interface Topic {
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
  TopicId: string;
  Title: string;
  Description: string;
  OptionA: string;
  OptionB: string;
  OptionC: string;
  OptionD: string;
  Answer: string;
  Score: number;
}
