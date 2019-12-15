import { TopicItem, Question, Topic } from '../models';

export const getTopicsList = (list: Question[] = []): string[] => {
  const topicsList: string[] = [];
  if (list.length > 0) {
    list.forEach(l => {
      if (!topicsList.includes(l.TopicId)) {
        topicsList.push(l.TopicId);
      }
    });
  }
  return topicsList;
};

const buildQuestionsList = (
  dataList: Question[] = [],
  topic: string
): Question[] => {
  const questions: Question[] = [];
  if (dataList.length > 0 && topic) {
    const data = dataList.filter(d => d.TopicId === topic);
    if (data.length > 0) {
      data.forEach(d => {
        const question: Question = {} as Question;
        question.Answer = d.Answer;
        question.Id = d.Id;
        question.Description = d.Description;
        question.Options = d.Options;
        question.TopicId = topic;
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

export const dataReStructure = (dataList: Question[] = [], topicsCollection: Topic[]): TopicItem[] => {
  const dataEntry: TopicItem[] = [];
  if (dataList.length > 0) {
    const topicsList: string[] = getTopicsList(dataList);
    topicsList.forEach(topic => {
      const entry: TopicItem = {} as TopicItem;
      entry.Id = topic;
      entry.Title = topicsCollection.find(lang => lang.Code.toLowerCase() === topic.toLowerCase()).Name;
      entry.Questions = buildQuestionsList(dataList, topic);
      dataEntry.push(entry);
    });
  }
  return dataEntry;
};

