import { Component, OnInit } from '@angular/core';
import { Question, TopicItem, Topic } from 'src/app/models';
import { ApiService, DataService } from 'src/app/services';
import { Router } from '@angular/router';
import { dataReStructure, DEFAULT_ADMIN_ROUTE } from 'src/app/Utility';

@Component({
  selector: 'app-questions-list',
  templateUrl: './questions-list.component.html',
  styleUrls: ['./questions-list.component.scss']
})
export class QuestionsListComponent implements OnInit {

  topicsQuestions: TopicItem[] = [];
  allQuestions: Question[] = [];
  topicsList: Topic[] = [];
  selectedTopic = '';
  selectedTopicQuestions: Question[] = [];

  constructor(
    private api: ApiService,
    private data: DataService,
    private router: Router
  ) {}

  ngOnInit() {
    this.init();
  }

  init() {
    this.topicsList = this.data.getTopicsCollection();
    if (this.topicsList && this.topicsList.length === 0) {
      this.api.getTopicsCollection().then((topicsCollection: Topic[]) => {
        this.data.setTopicsCollection(topicsCollection);
        this.topicsList = topicsCollection;
        this.getQuestion();
      }).catch(error => console.log(error));
    } else {
      this.getQuestion();
    }
  }

  getQuestion() {
    this.api.getAllQuestions().then((questionsList: Question[]) => {
      if (questionsList && questionsList.length > 0) {
        this.allQuestions = questionsList;
        this.topicsQuestions = dataReStructure(
          questionsList,
          this.topicsList
        );
        this.onTopicSelect(this.topicsQuestions[0]);
      }
    }).catch(error => console.log(error));
  }

  onTopicSelect(topic: TopicItem) {
    this.selectedTopic = topic.Id;
    this.selectedTopicQuestions = topic.Questions;
  }

  onEditQuestion(questionId: string) {
    this.data.onEditQuestion.next(questionId);
    this.router.navigate([`${DEFAULT_ADMIN_ROUTE}data-entry/edit`]);
  }

  onDeleteQuestion(questionId: string) {
    this.api.deleteQuestion(questionId).then(() => {
      this.allQuestions = this.allQuestions.filter(q => q.Id !== questionId);
      this.selectedTopicQuestions = this.selectedTopicQuestions.filter(q => q.Id !== questionId);
      this.topicsQuestions = this.topicsQuestions.map(topic => {
        if (this.selectedTopic === topic.Id) {
          topic.Questions = topic.Questions.filter(q => q.Id !== questionId);
        }
        return topic;
      });
    }).catch(err => {
      console.log(err);
    });
  }
}
