import { Component, OnInit, OnDestroy, EventEmitter, Output } from '@angular/core';
import { Question, SelectedAnswers, QuestionOption } from 'src/app/models';
import { Subscription } from 'rxjs';
import { QuizService } from 'src/app/services/quiz.service';
// import { EmptyQuestionBuilder } from 'src/app/builders';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit, OnDestroy {

  question: Question;
  questionOptions: string[];
  questionNumber: number;
  questionSelectSubscription: Subscription;
  selectedOption: string;
  // tslint:disable-next-line: no-output-on-prefix
  @Output() onSelect: EventEmitter<SelectedAnswers> = new EventEmitter<SelectedAnswers>();

  constructor(private quiz: QuizService) {
    // this.question = new EmptyQuestionBuilder().question;
  }

  ngOnInit() {
    this.questionSelectSubscription = this.quiz.onQuestionSelect.subscribe((qNum) => {
      this.questionNumber = qNum + 1;
      this.question = this.quiz.getQuestion(qNum);
      this.questionOptions = [];
      if (this.question) {
        Object.keys(this.question.Options).forEach(qKey => {
          if (this.question.Options[qKey] && qKey !== '_id') {
            this.questionOptions.push(qKey);
          }
        });
      }
      this.selectedOption = this.question.SelectedAnswers;
    });
  }

  onChange($event): void {
    this.selectedOption = $event;
    const Id = this.question._id;
    this.onSelect.emit({
      Id,
      Answer: $event
    });
  }

  ngOnDestroy() {
    this.questionSelectSubscription.unsubscribe();
  }
}
