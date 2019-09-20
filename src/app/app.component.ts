import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Role } from './models';

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
  ) {}

  ngOnInit() {
    this.roleSyncSubscription = this.auth.roleSync.subscribe((role: Role) => {
      this.mode = role;
    });
    this.nameSyncSubscription = this.auth.nameSync.subscribe((name: string) => {
      this.name = name;
    });
  }

  addQuestions() {
    this.router.navigate(['/data-entry']);
  }

  goToTrash() {
    this.router.navigate(['/trash']);
  }

  ngOnDestroy() {
    this.roleSyncSubscription.unsubscribe();
    this.nameSyncSubscription.unsubscribe();
  }

  reset() {
    this.auth.resetAll();
  }
}
