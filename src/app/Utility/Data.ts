import { Language, Question, LanguageStructure } from '../models';

export const getLanguagesList = (list: Question[] = []): string[] => {
  const languagesList: string[] = [];
  if (list.length > 0) {
    list.forEach(l => {
      if (!languagesList.includes(l.LanguageId)) {
        languagesList.push(l.LanguageId);
      }
    });
  }
  return languagesList;
};

const buildQuestionsList = (
  dataList: Question[] = [],
  language: string
): Question[] => {
  const questions: Question[] = [];
  if (dataList.length > 0 && language) {
    const data = dataList.filter(d => d.LanguageId === language);
    if (data.length > 0) {
      data.forEach(d => {
        const question: Question = {} as Question;
        question.Answer = d.Answer;
        question.Id = d.Id;
        question.Description = d.Description;
        question.Options = d.Options;
        question.LanguageId = language;
        question.Score = d.Score;
        question.Title = d.Title;
        question.IsActive = d.IsActive;
        question.SelectedAnswers = d.SelectedAnswers;
        questions.push(question);
      });
    }
  }
  return questions;
};

export const dataReStructure = (dataList: Question[] = [], languageCollection: LanguageStructure[]): Language[] => {
  const dataEntry: Language[] = [];
  if (dataList.length > 0) {
    const languagesList: string[] = getLanguagesList(dataList);
    languagesList.forEach(language => {
      const entry: Language = {} as Language;
      entry.Id = language;
      entry.Title = languageCollection.find(lang => lang.Code === language).Name;
      entry.Questions = buildQuestionsList(dataList, language);
      dataEntry.push(entry);
    });
  }
  return dataEntry;
};

