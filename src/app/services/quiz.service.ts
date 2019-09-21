import { Injectable } from '@angular/core';
import {
  Questions,
  Question,
  SelectedAnswers,
  LanguageStructure,
  Languages,
  Language,
  TOTAL_SCORE,
  ACTUAL_SCORE,
  DEFAULT_SCORE
} from '../models';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private Questions: Question[] = [];
  // Available Languages with questions
  private AvailableLanguages: LanguageStructure[] = [];
  private selectedLanguage: string;
  onQuestionSelect: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private TotalScore = TOTAL_SCORE;
  private ActualScore = ACTUAL_SCORE;
  private DefaultScore = DEFAULT_SCORE;

  constructor() { }

  private calculateActualScore() {
    this.ActualScore = ACTUAL_SCORE;
    this.Questions.forEach(q => {
      this.ActualScore += q.Score || this.DefaultScore;
    });
  }

  setQuestions(questions: Question[]): void {
    this.Questions = questions;
    this.calculateActualScore();
  }

  setLanguage(langId: string) {
    this.selectedLanguage = langId;
  }

  getQuestions(): Question[] {
    return this.Questions.slice(0);
  }

  setAvailableLanguages(availableLanguages: LanguageStructure[]) {
    this.AvailableLanguages = availableLanguages;
  }

  getLanguages(): LanguageStructure[] {
    return this.AvailableLanguages.slice(0);
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

  calculateMyScore(): string {
    this.TotalScore = TOTAL_SCORE;
    this.Questions.forEach(q => {
      if (q.Answer === q.SelectedAnswers) {
        this.TotalScore += q.Score || this.DefaultScore;
      }
    });
    return `${this.TotalScore}/${this.ActualScore}`;
  }
}
