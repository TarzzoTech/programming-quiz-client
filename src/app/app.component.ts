import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Role, Topic } from './models';
import { ApiService } from './services/api.service';
import { DataService } from './services/data.service';
import { DEFAULT_ADMIN_ROUTE } from './Utility';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit, OnDestroy {

  mode: Role;
  role = Role;
  name: string;
  roleSyncSubscription: Subscription;
  nameSyncSubscription: Subscription;

  constructor(
    private auth: AuthService,
    private router: Router,
    private api: ApiService,
    private data: DataService
  ) {
  }

  ngOnInit() {
    this.roleSyncSubscription = this.auth.roleSync.subscribe((role: Role) => {
      this.mode = role;
    });
    this.nameSyncSubscription = this.auth.nameSync.subscribe((name: string) => {
      this.name = name;
    });
  }

  addQuestions() {
    this.api.getLanguagesCollection().then((languagesCollection: Topic[]) => {
      this.data.setLanguagesCollection(languagesCollection);
      this.data.onEditQuestion.next('');
      this.router.navigate([`${DEFAULT_ADMIN_ROUTE}data-entry`]);
    }).catch(error => console.log(error));
  }

  goToTrash() {
    this.router.navigate([`${DEFAULT_ADMIN_ROUTE}trash`]);
  }

  gotToSettings() {
    this.router.navigate([`${DEFAULT_ADMIN_ROUTE}settings`]);
  }

  goToDashboard() {
    this.router.navigate([`${DEFAULT_ADMIN_ROUTE}dashboard`]);
  }

  ngOnDestroy() {
    this.roleSyncSubscription.unsubscribe();
    this.nameSyncSubscription.unsubscribe();
  }

  logout() {
    this.auth.resetAll();
    this.router.navigate([`/login`]);
  }
}
