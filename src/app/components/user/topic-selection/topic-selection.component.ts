import { Component, OnInit } from '@angular/core';
import { Topic, Question } from 'src/app/models';
import { QuizService, ApiService } from 'src/app/services';
import { Router } from '@angular/router';
import { DEFAULT_USER_ROUTE } from 'src/app/Utility';

@Component({
  selector: 'app-topic-selection',
  templateUrl: './topic-selection.component.html',
  styleUrls: ['./topic-selection.component.scss']
})
export class TopicSelectionComponent implements OnInit {

  selectedTopic: string;
  availableTopics: Topic[] = [];

  constructor(
    private router: Router,
    private quiz: QuizService,
    private api: ApiService
  ) {
    this.api.getAvailableTopics().then((availableTopics: Topic[]) => {
      this.availableTopics = availableTopics;
      this.quiz.setAvailableTopics(availableTopics);
    }).catch(error => console.log(error));
  }

  ngOnInit() {
  }

  onChange($event) {
    this.quiz.setTopic($event);
    this.selectedTopic = $event;
  }

  onContinue() {
    this.api.getQuestionsByTopic(this.selectedTopic).then((questionsList: Question[]) => {
      this.quiz.setQuestions(questionsList);
      this.router.navigate([`${DEFAULT_USER_ROUTE}quiz`]);
    }).catch(error => console.log(error));
  }

}
