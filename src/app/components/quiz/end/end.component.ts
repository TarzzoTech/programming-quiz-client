import { Component, OnInit, Input } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-end',
  templateUrl: './end.component.html',
  styleUrls: ['./end.component.scss']
})
export class EndComponent implements OnInit {

  selectedLanguage: string;

  @Input() scorecard: string;
  constructor(private quiz: QuizService) { }

  ngOnInit() {
    this.selectedLanguage = this.quiz.getLanguageName();
   }

}
