import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { QuestionsEntry, LanguageStructure, Question } from 'src/app/models';
import { QuestionsEntryBuilder, QuestionBuilder } from 'src/app/builders';
import {Observable, Subscription} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { DataService } from 'src/app/services/data.service';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-form-entry',
  templateUrl: './form-entry.component.html',
  styleUrls: ['./form-entry.component.scss']
})
export class FormEntryComponent implements OnInit, OnDestroy {

  questionEntryForm: FormGroup;
  languagesList: LanguageStructure[] = [];
  questionsEntry: QuestionsEntryBuilder;
  questionId = '';
  editId = '';
  actionLabel = 'Add';
  filteredOptions: Observable<LanguageStructure[]>;
  editQuestionSubscription: Subscription;

  constructor(
    private router: Router,
    private data: DataService,
    private api: ApiService
  ) {
    this.editQuestionSubscription = this.data.onEditQuestion.subscribe((editId: string) => {
      this.editId = editId;
    });
  }

  ngOnInit() {
    this.languagesList = this.data.getLanguagesCollection();
    if (this.editId) {
      this.actionLabel = 'Update';
      this.api.getQuestion(this.editId).then((question: Question) => {
        this.questionsEntry = new QuestionsEntryBuilder(question);
        this.init();
      });
    } else {
      this.actionLabel = 'Add';
      this.questionsEntry = new QuestionsEntryBuilder();
      this.init();
    }
  }

  ngOnDestroy() {
    this.editQuestionSubscription.unsubscribe();
  }

  init() {
    this.questionsEntry.then(questionsEntry => {
      this.createForm(questionsEntry);
      this.initializeAutoComplete();
    });
  }

  initializeAutoComplete() {
    this.filteredOptions = this.questionEntryForm.controls.LanguageId.valueChanges
      .pipe(
        startWith(''),
        map((value: any) => typeof value === 'string' ? value : value.name),
        map((name: string) => name ? this._filter(name) : this.languagesList.slice())
      );
  }

  displayFn = (langCode?: string): string | undefined => {
    const language = this.languagesList.find(lang => lang.Code === langCode);
    return language ? language.Name : undefined;
  }

  private _filter(name: string): LanguageStructure[] {
    const filterValue = name.toLowerCase();
    return this.languagesList.filter(option => option.Name.toLowerCase().indexOf(filterValue) === 0);
  }

  createForm(questionsEntry: QuestionsEntry) {
    this.questionEntryForm = new FormGroup({
      LanguageId: new FormControl(questionsEntry.LanguageId, {
        validators: [
          Validators.required
        ]
      }),
      Score: new FormControl(questionsEntry.Score),
      Title: new FormControl(questionsEntry.Title, {
        validators: [
          Validators.required
        ]
      }),
      Description: new FormControl(questionsEntry.Description, {
        validators: [
          Validators.required
        ]
      }),
      OptionA: new FormControl(questionsEntry.OptionA, {
        validators: [
          Validators.required
        ]
      }),
      OptionB: new FormControl(questionsEntry.OptionB, {
        validators: [
          Validators.required
        ]
      }),
      OptionC: new FormControl(questionsEntry.OptionC),
      OptionD: new FormControl(questionsEntry.OptionD),
      Answer: new FormControl(questionsEntry.Answer, {
        validators: [
          Validators.required
        ]
      })
    });
  }

  onInsertFile() {
    this.router.navigate(['/data-entry/file']);
  }

  onSubmit = () => {
    console.log(this.questionEntryForm.value);
    const questionBuilder = new QuestionBuilder(this.questionEntryForm.value);
    questionBuilder.then(question => {
      if (this.editId) {
        this.api.updateQuestion(this.editId, question).then((questionsList: Question[]) => {
          console.log(questionsList);
          this.router.navigate(['/questions-list']);
        });
      } else {
        this.api.insertQuestion(question).then((questionsList: Question[]) => {
          console.log(questionsList);
          this.init();
        });
      }
    });
  }

}
