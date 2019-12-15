import { Component, OnInit, Input } from '@angular/core';
import { QuizService } from 'src/app/services';

@Component({
  selector: 'app-end',
  templateUrl: './end.component.html',
  styleUrls: ['./end.component.scss']
})
export class EndComponent implements OnInit {

  selectedTopic: string;

  @Input() scorecard: string;
  constructor(private quiz: QuizService) { }

  ngOnInit() {
    this.selectedTopic = this.quiz.getTopicName();
  }

}
