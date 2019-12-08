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
  // Available Topics with questions
  private AvailableTopics: Topic[] = [];
  private selectedTopic: string;
  onQuestionSelect: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor() { }

  setQuestions(questions: Question[]): void {
    this.Questions = questions;
  }

  setTopic(topicId: string) {
    this.selectedTopic = topicId;
  }

  getQuestions(): Question[] {
    return this.Questions.slice(0);
  }

  getSelectedTopic() {
    return this.selectedTopic;
  }

  setAvailableTopics(availableTopics: Topic[]) {
    this.AvailableTopics = availableTopics;
  }

  getTopicName(): string {
    if (this.selectedTopic) {
      return this.AvailableTopics.find(l => l.Code === this.selectedTopic).Name;
    } else {
      return '';
    }
  }

  getTotalQuestions(): number {
    return this.Questions.length;
  }

  getQuestion(num: number): Question {
    if (this.selectedTopic) {
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
