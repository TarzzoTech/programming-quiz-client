import { Component, OnInit } from '@angular/core';
import { Topic, Question } from 'src/app/models';
import { QuizService, ApiService } from 'src/app/services';
import { Router } from '@angular/router';
import { DEFAULT_USER_ROUTE } from 'src/app/Utility';

@Component({
  selector: 'app-language-selection',
  templateUrl: './language-selection.component.html',
  styleUrls: ['./language-selection.component.scss']
})
export class LanguageSelectionComponent implements OnInit {

  selectedLanguage: string;
  availableLanguages: Topic[] = [];

  constructor(
    private router: Router,
    private quiz: QuizService,
    private api: ApiService
  ) {
    this.api.getAvailableLanguages().then((availableLanguages: Topic[]) => {
      this.availableLanguages = availableLanguages;
      this.quiz.setAvailableLanguages(availableLanguages);
    }).catch(error => console.log(error));
  }

  ngOnInit() {
  }

  onChange($event) {
    this.quiz.setLanguage($event);
    this.selectedLanguage = $event;
  }

  onContinue() {
    this.api.getQuestionsByLanguage(this.selectedLanguage).then((questionsList: Question[]) => {
      this.quiz.setQuestions(questionsList);
      this.router.navigate([`${DEFAULT_USER_ROUTE}quiz`]);
    }).catch(error => console.log(error));
  }

}
