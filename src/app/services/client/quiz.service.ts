import { Injectable } from '@angular/core';
import {
  Question,
  SelectedAnswers,
  Topic,
} from '../../models';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private Questions: Question[] = [];
  // Available Languages with questions
  private AvailableLanguages: Topic[] = [];
  private selectedLanguage: string;
  onQuestionSelect: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor() { }

  setQuestions(questions: Question[]): void {
    this.Questions = questions;
  }

  setLanguage(langId: string) {
    this.selectedLanguage = langId;
  }

  getQuestions(): Question[] {
    return this.Questions.slice(0);
  }

  getSelectedLanguage() {
    return this.selectedLanguage;
  }

  setAvailableLanguages(availableLanguages: Topic[]) {
    this.AvailableLanguages = availableLanguages;
  }

  getLanguageName(): string {
    if (this.selectedLanguage) {
      return this.AvailableLanguages.find(l => l.Code === this.selectedLanguage).Name;
    } else {
      return '';
    }
  }

  getTotalQuestions(): number {
    return this.Questions.length;
  }

  getQuestion(num: number): Question {
    if (this.selectedLanguage) {
      return this.Questions[num];
    } else {
      return {} as Question;
    }
  }

  updateSelectedAnswers(answer: SelectedAnswers): void {
    this.Questions = this.Questions.map(sa => {
      if (sa._id === answer.Id) {
        sa.SelectedAnswers = answer.Answer;
      }
      return sa;
    });
  }
}
