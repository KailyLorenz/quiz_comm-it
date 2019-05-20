import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Question} from './question';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
const QUESTIONS = 'questions';
@Injectable({
  providedIn: 'root'
})

export class QuizService {
  constructor(private db: AngularFirestore,
              private http: HttpClient) {
    console.log('create questions');
    function createQuestins() {
      console.log('create questions from questions-data');
      http.get('assets/data.json').subscribe(data => {
        const questions =  data as Question[];
        questions.forEach((question, index) => {
          question.id = '' + (index + 1);
          db.collection(QUESTIONS).doc(question.id)
            .set(question).then();
        });
        }
      );
    }
    db.collection(QUESTIONS).valueChanges().subscribe(data => {
      if (!data || data.length === 0) {
        createQuestins();
      }
    });
  }
  getQuestions(): Observable<Question[]> {
    console.log('Questions')
    return this.db.collection(QUESTIONS)
      .valueChanges().pipe(map(data => {
        return data.map(e => e as Question);
      })).pipe(catchError(this.errorHandler));
  }
  private errorHandler(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      return throwError('server isn\'t available' );
    }
    const res = {
      message: error.error.toString().substr(0, 30),
      status: error.status,
      toString: () => `${res.message} ${res.status}`
    };
    return throwError(res);
  }
}
