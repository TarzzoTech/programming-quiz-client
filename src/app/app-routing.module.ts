import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { QuestionsListComponent } from './components/questions-list/questions-list.component';
import { MarksDashboardComponent } from './components/marks-dashboard/marks-dashboard.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { NoRouteComponent } from './components/no-route/no-route.component';
import { DataEntryComponent } from './components/data-entry/data-entry.component';
import { TrashComponent } from './components/trash/trash.component';
import { LanguageSelectionComponent } from './components/language-selection/language-selection.component';
import { FileEntryComponent } from './components/data-entry/file-entry/file-entry.component';
import { FormEntryComponent } from './components/data-entry/form-entry/form-entry.component';
import { AuthGuardService as AuthGuard } from './services/auth-guard.service';


const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '1',
    canActivate: [AuthGuard],
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
      }
    ]
  },
  {
    path: 'languages',
    component: LanguageSelectionComponent
  },
  {
    path: 'quiz',
    component: QuizComponent
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
