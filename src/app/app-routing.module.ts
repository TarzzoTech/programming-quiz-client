import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { QuestionsListComponent } from './components/admin/questions-list/questions-list.component';
import { MarksDashboardComponent } from './components/admin/marks-dashboard/marks-dashboard.component';
import { QuizComponent } from './components/user/quiz/quiz.component';
import { NoRouteComponent } from './components/no-route/no-route.component';
import { DataEntryComponent } from './components/admin/data-entry/data-entry.component';
import { TrashComponent } from './components/admin/trash/trash.component';
import { TopicSelectionComponent } from './components/user/topic-selection/topic-selection.component';
import { FileEntryComponent } from './components/admin/data-entry/file-entry/file-entry.component';
import { FormEntryComponent } from './components/admin/data-entry/form-entry/form-entry.component';
import { AuthGuardService as AuthGuard } from './services';
import { AdminComponent } from './components/admin/admin.component';
import { UserComponent } from './components/user/user.component';
import { SettingsComponent } from './components/admin/settings/settings.component';


const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '1',
    canActivate: [AuthGuard],
    component: AdminComponent,
    children: [
      {
        path: 'questions-list',
        component: QuestionsListComponent
      },
      {
        path: 'dashboard',
        component: MarksDashboardComponent
      },
      {
        path: 'data-entry',
        component: DataEntryComponent,
        children: [
          {
            path: '',
            component: FormEntryComponent
          },
          {
            path: 'edit',
            component: FormEntryComponent
          },
          {
            path: 'file',
            component: FileEntryComponent
          }
        ]
      },
      {
        path: 'trash',
        component: TrashComponent
      },
      {
        path: 'settings',
        component: SettingsComponent
      }
    ]
  },
  {
    path: '0',
    component: UserComponent,
    children: [
      {
        path: 'topics',
        component: TopicSelectionComponent
      },
      {
        path: 'quiz',
        component: QuizComponent
      },
    ]
  },
  {
    path: '404',
    component: NoRouteComponent
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
  },
  {
    path: '**',
    redirectTo: '/404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
