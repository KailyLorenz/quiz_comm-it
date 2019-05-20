import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Question} from '../question';
import {QuizService} from '../quiz.service';

@Component({
  selector: 'app-questions-quiz',
  templateUrl: './questions-quiz.component.html',
  styleUrls: ['./questions-quiz.component.css']
})
export class QuestionsQuizComponent implements OnInit {
  arrQuestions$: Observable<Question[]>;
  dataQuestions: Question[];
  userAnswers = [];
  data = {};
  answerUser: string;
  showResult: string;
  condition = true;
  buttonPrev = true;
  textButton = true;
  show = true;
  lenDataArr = 0;
  index = 0;
  countAnswers = 0;
  score = 0;
  constructor(private serviceQuiz: QuizService
              ) { }
  ngOnInit() {
    this.getQuestions();
  }
  startQuiz() {
    this.showQuestion();
    this.condition = !this.condition;
  }
  getQuestions() {
    this.arrQuestions$ = this.serviceQuiz.getQuestions();
  }
  showQuestion() {
    this.arrQuestions$.subscribe((data) => {
      this.dataQuestions = data;
      this.lenDataArr = this.dataQuestions.length;
      this.data = this.dataQuestions[this.index];
    });
  }
  nextQuestion() {
    this.buttonPrev = false;
    this.setAnswerUser();
    if (this.index === this.lenDataArr - 2) {
      this.textButton = !this.textButton;
    }
    if (this.dataQuestions[++this.index]) {
      this.getAnswerUsers();
      this.data = this.dataQuestions[this.index];
    } else {
      this.quizOver();
    }
  }
  prevQuestion() {
    this.textButton = true;
    if ( this.index === 1 ) {this.buttonPrev = !this.buttonPrev; }
    this.setAnswerUser();
    this.data = this.dataQuestions[--this.index];
    this.getAnswerUsers();
  }
  getAnswerUsers() {
    this.userAnswers[this.index] ? this.answerUser = this.userAnswers[this.index] : this.answerUser = undefined;
  }
  setAnswerUser() {
    if (this.answerUser) {
      this.userAnswers[this.index] = this.answerUser;
      this.answerUser = '';
    }
  }
  quizOver() {
    this.dataQuestions.filter( el => this.userAnswers
      .includes(el.answerRight) ? this.countAnswers++ : this.countAnswers);
    this.score = 100 / this.lenDataArr * this.countAnswers;
    this.show = !this.show;
    this.showResult = `Results: ${this.countAnswers} of
                                ${this.lenDataArr} questions answered correctly, Your score: = ${this.score}`;
    this.condition = !this.condition;
  }
}
