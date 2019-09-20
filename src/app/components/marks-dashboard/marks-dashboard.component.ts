import { Component, OnInit } from '@angular/core';
import { Dashboard } from 'src/app/models';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-marks-dashboard',
  templateUrl: './marks-dashboard.component.html',
  styleUrls: ['./marks-dashboard.component.scss']
})
export class MarksDashboardComponent implements OnInit {

  panelOpenState = false;

  displayedColumns: string[] = ['Email', 'Name', 'Score'];
  dashboardKeys: string[] = [];
  dataSource: Dashboard = {} as Dashboard;

  constructor(private data: DataService) {}

  ngOnInit() {
    this.dataSource = this.data.getDashboardData();
    this.dashboardKeys = Object.keys(this.dataSource);
  }

}
