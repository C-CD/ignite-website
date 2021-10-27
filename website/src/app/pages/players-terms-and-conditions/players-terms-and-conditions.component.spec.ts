import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayersTermsAndConditionsComponent } from './players-terms-and-conditions.component';

describe('PlayersTermsAndConditionsComponent', () => {
  let component: PlayersTermsAndConditionsComponent;
  let fixture: ComponentFixture<PlayersTermsAndConditionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayersTermsAndConditionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayersTermsAndConditionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
