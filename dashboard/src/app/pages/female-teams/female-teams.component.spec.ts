import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FemaleTeamsComponent } from './female-teams.component';

describe('FemaleTeamsComponent', () => {
  let component: FemaleTeamsComponent;
  let fixture: ComponentFixture<FemaleTeamsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FemaleTeamsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FemaleTeamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
