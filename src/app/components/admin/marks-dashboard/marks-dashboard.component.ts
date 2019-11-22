import { Component, OnInit } from '@angular/core';
import { Dashboard, Topic } from 'src/app/models';
import { DataService } from 'src/app/services/data.service';
import { ApiService } from 'src/app/services/api.service';
import { DashboardDataBuilder } from 'src/app/builders';

@Component({
  selector: 'app-marks-dashboard',
  templateUrl: './marks-dashboard.component.html',
  styleUrls: ['./marks-dashboard.component.scss']
})
export class MarksDashboardComponent implements OnInit {

  panelOpenState = false;

  displayedColumns: string[] = ['Email', 'Name', 'Score', 'TopicId'];
  dashboardKeys: string[] = [];
  dataSource: Dashboard = {} as Dashboard;
  topicsList: Topic[] = [];

  constructor(
    private data: DataService,
    private api: ApiService
  ) {}

  ngOnInit() {
      this.topicsList = this.data.getLanguagesCollection();
      this.api.getQuizDataCollection().then(response => {
        if (response) {
          this.data.setDashboardData(response);
          response = response.map(res => {
            if (!res.TopicId) {
              res.TopicId = 'JavaScript';
            } else {
              res.TopicId = this.topicsList.find(t => t.Code === res.TopicId).Name;
            }
            return res;
          });
          new DashboardDataBuilder(response).then(dashboardData => {
            this.dataSource = dashboardData;
            this.dashboardKeys = Object.keys(this.dataSource);
          });
        }
      }).catch(error => console.log(error));
  }

}
