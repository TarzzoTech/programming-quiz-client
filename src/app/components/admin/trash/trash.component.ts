import { Component, OnInit } from '@angular/core';
import { Question, TopicItem, Topic } from 'src/app/models';
import { ApiService, DataService } from 'src/app/services';
import { dataReStructure, DEFAULT_ADMIN_ROUTE } from 'src/app/Utility';

@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.scss']
})
export class TrashComponent implements OnInit {

  topicsQuestions: TopicItem[] = [];
  allQuestions: Question[] = [];
  topicsList: Topic[] = [];
  selectedTopic = '';
  selectedTopicQuestions: Question[] = [];

  constructor(
    private api: ApiService,
    private data: DataService,
  ) { }

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
    this.api.getTrashQuestions().then((questionsList: Question[]) => {
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

  onUndoQuestion(questionId: string) {
    this.api.undoQuestion(questionId).then(() => {
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
