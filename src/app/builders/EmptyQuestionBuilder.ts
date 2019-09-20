import { Question, QuestionsEntry } from '../models';
import { generateId } from '../Utility';

export class EmptyQuestionBuilder {
  question: Question = {
    Id: '',
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
