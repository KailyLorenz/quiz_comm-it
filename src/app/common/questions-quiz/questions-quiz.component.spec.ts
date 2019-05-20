import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionsQuizComponent } from './questions-quiz.component';

describe('QuestionsQuizComponent', () => {
  let component: QuestionsQuizComponent;
  let fixture: ComponentFixture<QuestionsQuizComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionsQuizComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionsQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
