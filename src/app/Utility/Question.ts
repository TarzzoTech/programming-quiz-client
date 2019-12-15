import { Question, QuizQuestionEntry } from '../models';

export const generateId = () => {
  return (
    '_' +
    Math.random()
      .toString(36)
      .substr(2) +
    Math.random()
      .toString(36)
      .substr(2)
  );
};


export const questionsEntry = (questions: Question[] = []): QuizQuestionEntry[] => {
  const quizQuestionEntry: QuizQuestionEntry[] = [];
  questions.forEach(question => {
    const entry: QuizQuestionEntry = {} as QuizQuestionEntry;
    entry.Id = question.Id;
    entry.SelectedAnswers = question.SelectedAnswers;
    quizQuestionEntry.push(entry);
  });
  return quizQuestionEntry;
};
