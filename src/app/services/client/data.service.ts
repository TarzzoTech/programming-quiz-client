import { Injectable } from '@angular/core';
import { Dashboard, Question, Topic, DataEntry } from '../../models';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  // date wise score details storage
  private DashboardData: Dashboard = {} as Dashboard;
  // list of languages storage
  private LanguagesList: Topic[] = [];
  // file data entry list of language based questions storage
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

  // set list of languages on data entry page load
  setLanguagesCollection(languagesList: Topic[]): void {
    this.LanguagesList = languagesList;
  }

  getLanguagesCollection(): Topic[] {
    return this.LanguagesList.slice(0);
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
      const languagesList: string[] = this.getLanguagesList(dataList);
      languagesList.forEach(language => {
        const entry: DataEntry = {} as DataEntry;
        entry.Title = language;
        entry.Questions = this.buildQuestionsList(dataList, language);
        dataEntry.push(entry);
      });
    }
    return dataEntry;
  }

  private getLanguagesList(list: any[] = []): string[] {
    const languagesList: string[] = [];
    if (list.length > 0) {
      list.forEach(l => {
        if (!languagesList.includes(l.Language)) {
          languagesList.push(l.Language);
        }
      });
    }
    return languagesList;
  }

  private buildQuestionsList(dataList: any[] = [], language: string): Question[] {
   const questions: Question[] = [];
   if (dataList.length > 0 && language) {
    const data = dataList.filter(d => d.Language === language);
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
