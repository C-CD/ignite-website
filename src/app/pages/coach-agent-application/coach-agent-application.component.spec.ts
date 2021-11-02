import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachAgentApplicationComponent } from './coach-agent-application.component';

describe('CoachAgentApplicationComponent', () => {
  let component: CoachAgentApplicationComponent;
  let fixture: ComponentFixture<CoachAgentApplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoachAgentApplicationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoachAgentApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
