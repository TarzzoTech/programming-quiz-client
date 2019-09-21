import { Component, OnInit } from '@angular/core';
import { QuesViewMode, QuizEntryResponse, QuizEntry } from 'src/app/models';
import { QuizService } from 'src/app/services/quiz.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { AuthService } from 'src/app/services/auth.service';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {
  QuesViewMode = QuesViewMode;
  viewMode: QuesViewMode;
  currentQuestion: number;
  totalQuestions: number;
  showSubmitBtn = false;
  questionNumberList: number[];
  scoreSubscription: Subscription;
  scorecard: string;

  constructor(
    private quiz: QuizService,
    private auth: AuthService,
    private api: ApiService
  ) {}

  ngOnInit() {
    this.viewMode = QuesViewMode.INSTRUCTIONS;
  }

  startQuiz(): void {
    this.totalQuestions = this.quiz.getTotalQuestions();
    this.updateQuizDetails(1);
    this.questionNumberList = [];
    for (let i = 1; i <= this.totalQuestions; i++) {
      this.questionNumberList.push(i);
    }
    this.viewMode = QuesViewMode.QUESTIONS;
  }

  onQSelect(num: number): void {
    this.updateQuizDetails(num);
  }

  updateQuizDetails(num: number): void {
    this.currentQuestion = num;
    this.quiz.onQuestionSelect.next(num - 1);
    if (num === this.totalQuestions) {
      this.showSubmitBtn = true;
    }
  }

  onSelect($event): void {
    this.quiz.updateSelectedAnswers($event);
  }

  nextQuestion(): void {
    this.updateQuizDetails((this.currentQuestion += 1));
  }

  submitQuiz(): void {
    this.viewMode = QuesViewMode.END;
    this.showSubmitBtn = false;
    this.scorecard = this.quiz.calculateMyScore();
    const userDetails = this.auth.getUserDetails();
    const quizEntry: QuizEntry = {
      ...userDetails,
      Score: this.scorecard
    };
    this.api.insertUserQuiz(quizEntry).then(() => {
      this.auth.resetAll();
    }).catch(error => console.log(error));
  }
}
