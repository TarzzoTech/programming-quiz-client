import { Question, QuestionsEntry } from '../models';
import { generateId } from '../Utility';

export class QuestionBuilder {
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
  constructor(questionsEntry: QuestionsEntry) {
    this.question.Id = generateId();
    this.question.LanguageId = questionsEntry.LanguageId;
    this.question.Title = questionsEntry.Title;
    this.question.Answer = questionsEntry.Answer;
    this.question.Description = questionsEntry.Description;
    this.question.Options.A = questionsEntry.OptionA;
    this.question.Options.B = questionsEntry.OptionB;
    this.question.Options.C = questionsEntry.OptionC;
    this.question.Options.D = questionsEntry.OptionD;
    this.question.Score = questionsEntry.Score;
    this.question.SelectedAnswers = '';
    this.question.IsActive = true;
  }

  then(cb) {
    cb(this.question);
  }
}
