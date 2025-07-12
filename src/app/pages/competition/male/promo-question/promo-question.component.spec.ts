import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromoQuestionComponent } from './promo-question.component';

describe('PromoQuestionComponent', () => {
  let component: PromoQuestionComponent;
  let fixture: ComponentFixture<PromoQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PromoQuestionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PromoQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
