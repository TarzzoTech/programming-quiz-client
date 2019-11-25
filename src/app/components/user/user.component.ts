import { Component, OnInit } from '@angular/core';
import { Instruction } from 'src/app/models';
import { SettingsService, ApiService } from 'src/app/services';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  constructor(
    private setting: SettingsService,
    private api: ApiService
  ) { }

  ngOnInit() {
    this.api.getQuizInstructions().then((instruction: Instruction) => {
        this.setting.setInstructions(instruction);
      }).catch(error => console.log(error));
    }

}
