import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FemaleCompetitionNavComponent } from './female-competition-nav.component';

describe('FemaleCompetitionNavComponent', () => {
  let component: FemaleCompetitionNavComponent;
  let fixture: ComponentFixture<FemaleCompetitionNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FemaleCompetitionNavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FemaleCompetitionNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
