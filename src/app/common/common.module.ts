import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import { QuestionsQuizComponent } from './questions-quiz/questions-quiz.component';
import {HttpClientModule} from '@angular/common/http';
import {MatButtonModule, MatCardModule, MatSelectModule, MatCheckboxModule, MatListModule, MatRadioModule} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
// import {MatListModule} from '@angular/material/list';
// import {MatCheckboxModule} from '@angular/material/typings/checkbox';
@NgModule({
  declarations: [QuestionsQuizComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRadioModule,
    MatCardModule,
    MatListModule,
    MatSelectModule,
    MatCheckboxModule,
    AngularFirestoreModule,
    HttpClientModule
  ],
  providers: [],
  exports: [QuestionsQuizComponent]
})
export class PlayCommonModule { }
