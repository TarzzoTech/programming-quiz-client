import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { QuestionsEntry, Topic, Question } from 'src/app/models';
import { QuestionsEntryBuilder, QuestionBuilder } from 'src/app/builders';
import {Observable, Subscription} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { DataService, ApiService } from 'src/app/services';
import { DEFAULT_ADMIN_ROUTE, getKeyByValue } from 'src/app/Utility';

@Component({
  selector: 'app-form-entry',
  templateUrl: './form-entry.component.html',
  styleUrls: ['./form-entry.component.scss']
})
export class FormEntryComponent implements OnInit, OnDestroy {

  questionEntryForm: FormGroup;
  topicsList: Topic[] = [];
  questionsEntry: QuestionsEntryBuilder;
  questionId = '';
  editId = '';
  actionLabel = 'Add';
  filteredOptions: Observable<Topic[]>;
  editQuestionSubscription: Subscription;
  OptionsList = [
    { label: 'Option A', value: 'OptionA' },
    { label: 'Option B', value: 'OptionB' },
    { label: 'Option C', value: 'OptionC' },
    { label: 'Option D', value: 'OptionD' },
  ];

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
    this.topicsList = this.data.getTopicsCollection();
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
    this.filteredOptions = this.questionEntryForm.controls.TopicId.valueChanges
      .pipe(
        startWith(''),
        map((value: any) => typeof value === 'string' ? value : value.name),
        map((name: string) => name ? this._filter(name) : this.topicsList.slice())
      );
  }

  displayFn = (langCode?: string): string | undefined => {
    const topic = this.topicsList.find(lang => lang.Code === langCode);
    return topic ? topic.Name : undefined;
  }

  private _filter(name: string): Topic[] {
    const filterValue = name.toLowerCase();
    return this.topicsList.filter(option => option.Name.toLowerCase().indexOf(filterValue) === 0);
  }

  createForm(questionsEntry: QuestionsEntry) {
    this.questionEntryForm = new FormGroup({
      TopicId: new FormControl(questionsEntry.TopicId, {
        validators: [
          Validators.required
        ]
      }),
      Score: new FormControl(questionsEntry.Score, {
        validators: [
          Validators.required
        ]
      }),
      Title: new FormControl(questionsEntry.Title, {
        validators: [
          Validators.required
        ]
      }),
      Description: new FormControl(questionsEntry.Description),
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
      Answer: new FormControl(getKeyByValue(questionsEntry, questionsEntry.Answer) || '', {
        validators: [
          Validators.required
        ]
      })
    });
  }

  onInsertFile() {
    this.router.navigate([`${DEFAULT_ADMIN_ROUTE}data-entry/file`]);
  }

  goQuestionsList() {
    this.router.navigate([`${DEFAULT_ADMIN_ROUTE}questions-list`]);
  }

  onSubmit = () => {
    const questionBuilder = new QuestionBuilder(this.questionEntryForm.value);
    questionBuilder.then(question => {
      if (this.editId) {
        this.api.updateQuestion(this.editId, question).then((questionsList: Question[]) => {
          console.log(questionsList);
          this.router.navigate([`${DEFAULT_ADMIN_ROUTE}questions-list`]);
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
