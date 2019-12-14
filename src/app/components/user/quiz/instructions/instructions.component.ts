import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services';
import { Instruction } from 'src/app/models';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.scss']
})
export class InstructionsComponent implements OnInit {

  instructionCMS = '';

  constructor(
    private api: ApiService
  ) { }

  ngOnInit() {
    this.api.getQuizInstructions().then((instructions: Instruction) => {
      const quizInstructionDiv = document.getElementById('quiz-instruction');
      quizInstructionDiv.innerHTML = instructions.CMS;
    });
  }

}
