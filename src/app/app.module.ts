import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatListModule } from '@angular/material/list';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { QuestionsListComponent } from './components/admin/questions-list/questions-list.component';
import { MarksDashboardComponent } from './components/admin/marks-dashboard/marks-dashboard.component';
import { QuizComponent } from './components/user/quiz/quiz.component';
import { InstructionsComponent } from './components/user/quiz/instructions/instructions.component';
import { QuestionsComponent } from './components/user/quiz/questions/questions.component';
import { EndComponent } from './components/user/quiz/end/end.component';
import { NoRouteComponent } from './components/no-route/no-route.component';
import { AuthService } from './services/auth.service';
import { MatButtonModule } from '@angular/material/button';
import { QuizService } from './services/quiz.service';
import { ApiService } from './services/api.service';
import { DataEntryComponent } from './components/admin/data-entry/data-entry.component';
import { TrashComponent } from './components/admin/trash/trash.component';
import { LanguageSelectionComponent } from './components/user/language-selection/language-selection.component';
import { DataService } from './services/data.service';
import { FileEntryComponent } from './components/admin/data-entry/file-entry/file-entry.component';
import { FormEntryComponent } from './components/admin/data-entry/form-entry/form-entry.component';
import { AuthGuardService } from './services/auth-guard.service';
import { AdminComponent } from './components/admin/admin.component';
import { UserComponent } from './components/user/user.component';
import { SettingsComponent } from './components/admin/settings/settings.component';
import { LayoutComponent } from './components/layout/layout.component';
import { QuestionAnswersComponent } from './components/user/quiz/question-answers/question-answers.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    QuestionsListComponent,
    MarksDashboardComponent,
    QuizComponent,
    InstructionsComponent,
    QuestionsComponent,
    EndComponent,
    NoRouteComponent,
    DataEntryComponent,
    TrashComponent,
    LanguageSelectionComponent,
    FileEntryComponent,
    FormEntryComponent,
    AdminComponent,
    UserComponent,
    SettingsComponent,
    LayoutComponent,
    QuestionAnswersComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatButtonModule,
    MatTooltipModule,
    MatIconModule,
    MatRadioModule,
    MatInputModule,
    MatExpansionModule,
    MatTableModule,
    MatAutocompleteModule,
    MatListModule
  ],
  providers: [
    AuthService,
    QuizService,
    ApiService,
    DataService,
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
