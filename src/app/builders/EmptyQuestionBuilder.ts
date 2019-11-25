import { Question } from '../models';

export class EmptyQuestionBuilder {
  question: Question = {
    Title: '',
    Description: '',
    Options: {
      A: '',
      B: '',
      C: '',
      D: ''
    },
    Answer: '',
    LanguageId: '',
    Score: 0,
    SelectedAnswers: '',
    IsActive: true
  };
}
