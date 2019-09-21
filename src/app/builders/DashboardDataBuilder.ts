import { DashboardItem, Dashboard } from '../models';

export class DashboardDataBuilder {

  private dashboardObj = {} as Dashboard;
  private dateList = [];
  private dashboardSource = [];
  constructor(dashboardSource: DashboardItem[]) {
    this.dashboardObj = {} as Dashboard;
    this.dateList = [];
    this.dashboardSource = dashboardSource;
  }

  then(cb) {
    this.dashboardSource.forEach(l => {
        const dateStr = new Date(l.CreatedDate).toDateString();
        if (this.dateList.indexOf(dateStr) === -1) {
            this.dateList.push(dateStr);
        }
    });
    this.dateList.forEach(dateKey => {
        this.dashboardObj[dateKey] = this.dashboardSource.filter(l => new Date(l.CreatedDate).toDateString() === dateKey);
    });
    cb(this.dashboardObj);
  }
}
