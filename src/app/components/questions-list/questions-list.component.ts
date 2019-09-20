import { Component, OnInit } from '@angular/core';
import { Question, Language, LanguageStructure } from 'src/app/models';
import { ApiService } from 'src/app/services/api.service';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';
import { dataReStructure } from 'src/app/Utility';

@Component({
  selector: 'app-questions-list',
  templateUrl: './questions-list.component.html',
  styleUrls: ['./questions-list.component.scss']
})
export class QuestionsListComponent implements OnInit {

  languagesQuestions: Language[] = [];
  allQuestions: Question[] = [];
  languagesList: LanguageStructure[] = [];
  selectedLanguage = '';
  selectedLanguageQuestions: Question[] = [];

  constructor(
    private api: ApiService,
    private data: DataService,
    private router: Router
  ) {}

  ngOnInit() {
    this.init();
    console.log(this.languagesQuestions);
  }

  init() {
    this.languagesList = this.data.getLanguagesCollection();
    this.api.getAllQuestions().then((questionsList: Question[]) => {
      if (questionsList && questionsList.length > 0) {
        this.allQuestions = questionsList;
        this.languagesQuestions = dataReStructure(
          questionsList,
          this.languagesList
        );
        this.onLanguageSelect(this.languagesQuestions[0]);
      }
    });
  }

  onLanguageSelect(language: Language) {
    this.selectedLanguage = language.Id;
    this.selectedLanguageQuestions = language.Questions;
    console.log(language);
  }

  onEditQuestion(questionId: string) {
    this.data.onEditQuestion.next(questionId);
    this.router.navigate(['/data-entry/Edit']);
  }
}
