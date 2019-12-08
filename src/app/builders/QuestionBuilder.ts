import { Question, QuestionsEntry, DEFAULT_SCORE } from '../models';

export class QuestionBuilder {
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
    TopicId: '',
    Score: DEFAULT_SCORE,
    SelectedAnswers: '',
    IsActive: true
  };
  constructor(questionsEntry: QuestionsEntry) {
    this.question.TopicId = questionsEntry.TopicId;
    this.question.Title = questionsEntry.Title;
    this.question.Answer = questionsEntry.Answer;
    this.question.Description = questionsEntry.Description;
    this.question.Options.A = questionsEntry.OptionA;
    this.question.Options.B = questionsEntry.OptionB;
    this.question.Options.C = questionsEntry.OptionC;
    this.question.Options.D = questionsEntry.OptionD;
    this.question.Score = questionsEntry.Score || DEFAULT_SCORE;
    this.question.SelectedAnswers = '';
    this.question.IsActive = true;
  }

  then(cb) {
    cb(this.question);
  }
}
