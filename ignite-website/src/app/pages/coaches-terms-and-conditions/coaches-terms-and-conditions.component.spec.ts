import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachesTermsAndConditionsComponent } from './coaches-terms-and-conditions.component';

describe('CoachesTermsAndConditionsComponent', () => {
  let component: CoachesTermsAndConditionsComponent;
  let fixture: ComponentFixture<CoachesTermsAndConditionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoachesTermsAndConditionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoachesTermsAndConditionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
