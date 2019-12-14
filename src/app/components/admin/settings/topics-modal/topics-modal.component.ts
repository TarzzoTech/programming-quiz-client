import { Component, OnInit } from '@angular/core';
import { ApiService, DataService } from 'src/app/services';
import { Topic } from 'src/app/models';

@Component({
  selector: 'app-topics-modal',
  templateUrl: './topics-modal.component.html',
  styleUrls: ['./topics-modal.component.scss']
})
export class TopicsModalComponent implements OnInit {

  topicsList: Topic[] = [];

  constructor(
    private api: ApiService,
    private data: DataService
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
      }).catch(error => console.log(error));
    }
  }

}
