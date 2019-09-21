import { Injectable } from '@angular/core';
import * as bcrypt from 'bcryptjs';
import { User, Question, LanguagesList, LanguageStructure, QuizEntryResponse } from '../models';
import { getLanguagesList } from '../Utility';
import { HttpClient } from '@angular/common/http';

const API_URL = 'http://localhost:3000/';

const storage = localStorage;
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
  // QuizEntryResponse change to QuizEntry after actual API implemented
  insertUserQuiz(data: QuizEntryResponse) {
    return new Promise((resolve, reject) => {
      try {
        const quizDataCollectionSting = storage.getItem('QuizDataCollection');
        let quizDataCollection: QuizEntryResponse[] = [];
        if (quizDataCollectionSting) {
          quizDataCollection = JSON.parse(quizDataCollectionSting);
        }
        quizDataCollection.push(data);
        storage.setItem('QuizDataCollection', JSON.stringify(quizDataCollection));
        resolve(quizDataCollection);
      } catch (error) {
        reject('Inserting Quiz Data is failed!');
      }
    });
  }

  // ------------------------------------------------------------------------------------------------------------------------

  // APIs related to Questions

  // get all languages
  getLanguagesCollection() {
    return new Promise((resolve, reject) => {
      try {
        const languagesCollectionSting = storage.getItem('LanguagesCollection');
        let languagesCollection: LanguageStructure[] = [];
        if (languagesCollectionSting) {
          languagesCollection = JSON.parse(languagesCollectionSting);
        } else {
          languagesCollection = LanguagesList;
          storage.setItem('LanguagesCollection', JSON.stringify(languagesCollection));
        }
        resolve(languagesCollection);
      } catch (error) {
        reject('Fetching Languages Collection is failed!');
      }
    });
  }

  getAvailableLanguages() {
    return new Promise((resolve, reject) => {
      try {
        const languagesCollectionSting = storage.getItem('LanguagesCollection');
        const questionsListSting = storage.getItem('QuestionsList');
        let languagesCollection: LanguageStructure[] = [];
        let questionsList: Question[] = [];
        if (languagesCollectionSting) {
          languagesCollection = JSON.parse(languagesCollectionSting);
        } else {
          storage.setItem('LanguagesCollection', JSON.stringify(LanguagesList));
        }
        if (questionsListSting) {
          questionsList = JSON.parse(questionsListSting);
          const languagesIdList = getLanguagesList(questionsList);
          languagesCollection = languagesCollection.filter(lang => languagesIdList.includes(lang.Code));
        }
        resolve(languagesCollection);
      } catch (error) {
        reject('Fetching Available Languages is failed!');
      }
    });
  }

  // get all questions
  getAllQuestions() {
    return new Promise((resolve, reject) => {
      try {
        const questionsListSting = storage.getItem('QuestionsList');
        let questionsList: Question[] = [];
        if (questionsListSting) {
          questionsList = JSON.parse(questionsListSting);
        }
        resolve(questionsList);
      } catch (error) {
        reject('Fetching questions list is failed!');
      }
    });
  }

  // get question
  getQuestion(questionId: string) {
    return new Promise((resolve, reject) => {
      try {
        const questionsListSting = storage.getItem('QuestionsList');
        let questionsList: Question[] = [];
        let question = {} as Question;
        if (questionsListSting) {
          questionsList = JSON.parse(questionsListSting);
          const questionObj = questionsList.find(q => q.Id === questionId);
          if (question) {
            question = questionObj;
          }
        } else {
          storage.setItem('QuestionsList', JSON.stringify(questionsList));
        }
        resolve(question);
      } catch (error) {
        reject('Fetching question is failed!');
      }
    });
  }

  // get the list of questions by language
  getQuestionsByLanguage(languageId: string) {
    return new Promise((resolve, reject) => {
      try {
        const questionsListSting = storage.getItem('QuestionsList');
        let questionsList: Question[] = [];
        if (questionsListSting) {
          questionsList = JSON.parse(questionsListSting);
          questionsList = questionsList.filter(q => q.LanguageId === languageId);
        }
        resolve(questionsList);
      } catch (error) {
        reject('Fetching questions by language is failed!');
      }
    });
  }

  // insert question
  insertQuestion(question: Question) {
    return new Promise((resolve, reject) => {
      try {
        const questionsListSting = storage.getItem('QuestionsList');
        let questionsList: Question[] = [];
        if (questionsListSting) {
          questionsList = JSON.parse(questionsListSting);
        }
        questionsList.push(question);
        storage.setItem('QuestionsList', JSON.stringify(questionsList));
        resolve(questionsList);
      } catch (error) {
        reject('Inserting question is failed!');
      }
    });
  }

  // update question
  updateQuestion(questionId: string, question: Question) {
    return new Promise((resolve, reject) => {
      try {
        const questionsListSting = storage.getItem('QuestionsList');
        let questionsList: Question[] = [];
        if (questionsListSting) {
          questionsList = JSON.parse(questionsListSting);
          const questionObj = questionsList.find(q => q.Id === questionId);
          if (questionObj) {
            questionsList = questionsList.map(q => {
              if (q.Id === questionId) {
                q = { ...question, Id: q.Id };
              }
              return q;
            });
          } else {
            questionsList.push(question);
          }
        }
        storage.setItem('QuestionsList', JSON.stringify(questionsList));
        resolve(questionsList);
      } catch (error) {
        reject('Updating question is failed!');
      }
    });
  }

  // delete question
  deleteQuestion(questionId: string) {
    return new Promise((resolve, reject) => {
      try {
        const questionsListSting = storage.getItem('QuestionsList');
        let questionsList: Question[] = [];
        if (questionsListSting) {
          questionsList = JSON.parse(questionsListSting);
          const questionObj = questionsList.find(q => q.Id === questionId);
          if (questionObj) {
            questionsList = questionsList.map(q => {
              if (q.Id === questionId) {
                q.IsActive = false;
              }
              return q;
            });
          }
        }
        storage.setItem('QuestionsList', JSON.stringify(questionsList));
        resolve(questionsList);
      } catch (error) {
        reject('Deleting question is failed!');
      }
    });
  }

  // delete entire language
  deleteRecord(languageId: string) {
    return new Promise((resolve, reject) => {
      try {
        const questionsListSting = storage.getItem('QuestionsList');
        let questionsList: Question[] = [];
        if (questionsListSting) {
          questionsList = JSON.parse(questionsListSting);
          questionsList = questionsList.map(q => {
            if (q.LanguageId === languageId) {
              q.IsActive = false;
            }
            return q;
          });
        }
        storage.setItem('QuestionsList', JSON.stringify(questionsList));
        resolve(questionsList);
      } catch (error) {
        reject('Deleting question is failed!');
      }
    });
  }
}
