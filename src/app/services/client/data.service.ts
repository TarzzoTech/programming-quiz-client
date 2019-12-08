import { Injectable } from '@angular/core';
import { Dashboard, Question, Topic, DataEntry } from '../../models';
import { BehaviorSubject } from 'rxjs';

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
  dataEntry(dataList: any[] = []): DataEntry[] {
    const res = this.dataReStructure(dataList);
    this.QuizData.push(...res);
    return this.QuizData.slice(0);
  }

  private dataReStructure(dataList: any[] = []): DataEntry[] {
    const dataEntry: DataEntry[] = [];
    if (dataList.length > 0) {
      const topicsList: string[] = this.getTopicsList(dataList);
      topicsList.forEach(topic => {
        const entry: DataEntry = {} as DataEntry;
        entry.Title = topic;
        entry.Questions = this.buildQuestionsList(dataList, topic);
        dataEntry.push(entry);
      });
    }
    return dataEntry;
  }

  private getTopicsList(list: any[] = []): string[] {
    const topicsList: string[] = [];
    if (list.length > 0) {
      list.forEach(l => {
        if (!topicsList.includes(l.Topic)) {
          topicsList.push(l.Topic);
        }
      });
    }
    return topicsList;
  }

  private buildQuestionsList(dataList: any[] = [], topic: string): Question[] {
   const questions: Question[] = [];
   if (dataList.length > 0 && topic) {
    const data = dataList.filter(d => d.Topic === topic);
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
        question.Score = d.Score || 5;
        question.Title = d.Question;
        questions.push(question);
      });
    }
   }
   return questions;
  }

}
