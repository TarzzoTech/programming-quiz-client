import { Component, OnInit } from '@angular/core';
import { SettingsService, ApiService } from 'src/app/services';
import { Setting, Instruction } from 'src/app/models';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  constructor(
    private setting: SettingsService,
    private api: ApiService
  ) { }

  ngOnInit() {
    this.api.getSettings().then((setting: Setting) => {
      this.setting.setSettings(setting);
    }).catch(error => console.log(error));
    this.api.getQuizInstructions().then((instruction: Instruction) => {
      this.setting.setInstructions(instruction);
    }).catch(error => console.log(error));
  }

}
