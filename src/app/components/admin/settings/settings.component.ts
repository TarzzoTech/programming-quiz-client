import { Component, OnInit } from '@angular/core';
import { SettingsService, ApiService, DataService } from 'src/app/services';
import { Setting, Instruction, Topic } from 'src/app/models';
import { MatDialog } from '@angular/material/dialog';
import { TopicsModalComponent } from './topics-modal/topics-modal.component';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  settings: Setting = {
    IsRandom: false,
    QuizQuestionsCount: 0
  } as Setting;
  instructions: Instruction = {
    CMS: ''
  } as Instruction;
  topicsList: Topic[] = [];
  topicName = '';
  topicCode = '';
  topicCodeError = '';
  settingsUpdateError = '';
  insUpdateError = '';

  constructor(
    private setting: SettingsService,
    private api: ApiService,
    public dialog: MatDialog,
    private data: DataService
  ) { }

  ngOnInit() {
    this.init();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(TopicsModalComponent, {
      width: '300px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  init() {
    this.api.getSettings().then((setting: Setting) => {
      this.setting.setSettings(setting);
      this.settings = setting;
    }).catch(error => console.log(error));

    this.api.getQuizInstructions().then((instruction: Instruction) => {
      this.setting.setInstructions(instruction);
      this.instructions = instruction;
    }).catch(error => console.log(error));

    this.topicsList = this.data.getTopicsCollection();
    if (this.topicsList && this.topicsList.length === 0) {
      this.api.getTopicsCollection().then((topicsCollection: Topic[]) => {
        this.data.setTopicsCollection(topicsCollection);
        this.topicsList = topicsCollection;
      }).catch(error => console.log(error));
    }
  }

  addTopic() {
    if (this.topicsList.filter(t => t.Code.toLowerCase() === this.topicCode.toLowerCase()).length > 0) {
      this.topicCodeError = 'Topic code already exist.';
    } else {
      this.topicCodeError = '';
      const topic: Topic = {
        Name: this.topicName,
        Code: this.topicCode
      };
      this.api.addTopic(topic).then((topicsList: Topic[]) => {
        this.topicName = '';
        this.topicCode = '';
        this.data.setTopicsCollection(topicsList);
        this.topicsList = topicsList;
      }).catch(error => console.log(error));
    }
  }

  randomToggle($event) {
    this.settings.IsRandom = $event.checked;
  }

  updateSetting() {
    this.api.updateSettings(this.settings).then((isSucceeded) => {
      console.log(isSucceeded);
      if (!isSucceeded) {
        this.settingsUpdateError = 'Settings update failed';
      }
    }).catch(error => {
      this.settingsUpdateError = 'Settings update failed';
      console.log(error);
    });
  }

  updateInstructions() {
    this.api.updateInstruction(this.instructions).then((isSucceeded) => {
      console.log(isSucceeded);
      if (!isSucceeded) {
        this.insUpdateError = 'Instructions update failed';
      }
    }).catch(error => {
      this.insUpdateError = 'Instructions update failed';
      console.log(error);
    });
  }

}
