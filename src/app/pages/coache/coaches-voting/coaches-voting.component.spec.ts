import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachesVotingComponent } from './coaches-voting.component';

describe('CoachesVotingComponent', () => {
  let component: CoachesVotingComponent;
  let fixture: ComponentFixture<CoachesVotingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoachesVotingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoachesVotingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
