import { Injectable } from '@angular/core';
import {  Question, QuizEntry } from '../models';
import { HttpClient } from '@angular/common/http';

const API_URL = 'http://localhost:3000/';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(
    private http: HttpClient
  ) {}

  // APIs related to authentication

  // to check the email is admin's email
  validateEmail(Email: string): Promise<any> {
    return this.http.post(`${API_URL}auth/validate-email`, { Email }).toPromise();
  }

  // validating the admin's password
  validatePwd(Email: string, Password: string): Promise<any> {
    return this.http.post(`${API_URL}auth/validate-password`, { Email, Password }).toPromise();
  }

  // ------------------------------------------------------------------------------------------------------------------------

  // APIs related to Quiz

  // get all the user's quiz data
  getQuizDataCollection(): Promise<any> {
    return this.http.get(`${API_URL}quiz/all-entries`).toPromise();
  }

  // insert user's quiz data
  insertUserQuiz(quizEntry: QuizEntry) {
    return this.http.post(`${API_URL}quiz/quiz-entry`, quizEntry).toPromise();
  }

  // ------------------------------------------------------------------------------------------------------------------------

  // APIs related to Questions

  // get all languages
  getLanguagesCollection() {
    return this.http.get(`${API_URL}languages`).toPromise();
  }

  getAvailableLanguages() {
    return this.http.get(`${API_URL}languages/available-languages`).toPromise();
  }

  // get all questions
  getAllQuestions() {
    return this.http.get(`${API_URL}questions`).toPromise();
  }

  // get question
  getQuestion(questionId: string) {
    return this.http.get(`${API_URL}questions/${questionId}`).toPromise();
  }

  // get the list of questions by language
  getQuestionsByLanguage(languageId: string) {
    return this.http.get(`${API_URL}questions/quiz-questions/${languageId}`).toPromise();
  }

  // insert question
  insertQuestion(question: Question) {
    return this.http.post(`${API_URL}questions`, question).toPromise();
  }

  // update question
  updateQuestion(questionId: string, question: Question) {
    return this.http.put(`${API_URL}questions/${questionId}`, question).toPromise();
  }

  // delete question
  deleteQuestion(questionId: string) {
    return this.http.delete(`${API_URL}questions/${questionId}`).toPromise();
  }

  // delete entire language
  deleteRecord(languageId: string) {
    return this.http.delete(`${API_URL}languages/${languageId}`).toPromise();
  }
}
