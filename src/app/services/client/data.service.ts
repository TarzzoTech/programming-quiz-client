import { Injectable } from '@angular/core';
import { Dashboard, Question, Topic, DataEntry, QuestionsEntry, DEFAULT_SCORE } from '../../models';
import { BehaviorSubject } from 'rxjs';
import { QuestionBuilder } from 'src/app/builders';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  // date wise score details storage
  private DashboardData: Dashboard = {} as Dashboard;
  // list of topics storage
  private TopicsList: Topic[] = [];
  // file data entry list of topic based questions storage
  private QuizData: DataEntry[] = [];
  // subscribe on question edit click
  onEditQuestion: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor() { }

  // set list of score details of the users on Admin login success
  setDashboardData(dashboardData: Dashboard): void {
    this.DashboardData = dashboardData;
  }

  getDashboardData(): Dashboard {
    return JSON.parse(JSON.stringify(this.DashboardData));
  }

  // set list of topics on data entry page load
  setTopicsCollection(topicsList: Topic[]): void {
    this.TopicsList = topicsList;
  }

  getTopicsCollection(): Topic[] {
    return this.TopicsList.slice(0);
  }

  // file data entry business/functions --> currently not in use but implemented
  // validation for mandatory fields are pending
  dataEntry(dataList: QuestionsEntry[] = []): DataEntry[] {
    const res = this.dataReStructure(dataList);
    this.QuizData.push(...res);
    return this.QuizData.slice(0);
  }

  formatFileDataEntry(dataList: QuestionsEntry[] = []): Question[] {
    const questionsList = [];
    dataList.forEach(data => {
      new QuestionBuilder(data).then(q => {
        questionsList.push(q);
      });
    });
    return questionsList;
  }

  private dataReStructure(dataList: QuestionsEntry[] = []): DataEntry[] {
    const dataEntry: DataEntry[] = [];
    if (dataList.length > 0) {
      const topicsList: string[] = this.getTopicsList(dataList);
      topicsList.forEach(TopicId => {
        const entry: DataEntry = {} as DataEntry;
        entry.TopicId = TopicId;
        entry.Questions = this.buildQuestionsList(dataList, TopicId);
        dataEntry.push(entry);
      });
    }
    return dataEntry;
  }

  private getTopicsList(list: QuestionsEntry[] = []): string[] {
    const topicsList: string[] = [];
    if (list.length > 0) {
      list.forEach(l => {
        if (!topicsList.includes(l.TopicId)) {
          topicsList.push(l.TopicId);
        }
      });
    }
    return topicsList;
  }

  private buildQuestionsList(dataList: QuestionsEntry[] = [], TopicId: string): Question[] {
   const questions: Question[] = [];
   if (dataList.length > 0 && TopicId) {
    const data = dataList.filter(d => d.TopicId === TopicId);
    if (data.length > 0) {
      data.forEach(d => {
        const question: Question = {} as Question;
        question.Answer = d.Answer;
        question.Description = d.Description;
        question.Options = {
          A: d.OptionA,
          B: d.OptionB,
          C: d.OptionC,
          D: d.OptionD
        };
        question.Score = d.Score || DEFAULT_SCORE;
        question.Title = d.Title;
        questions.push(question);
      });
    }
   }
   return questions;
  }

}
