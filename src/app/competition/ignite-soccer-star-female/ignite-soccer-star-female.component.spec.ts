import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IgniteSoccerStarFemaleComponent } from './ignite-soccer-star-female.component';

describe('IgniteSoccerStarFemaleComponent', () => {
  let component: IgniteSoccerStarFemaleComponent;
  let fixture: ComponentFixture<IgniteSoccerStarFemaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IgniteSoccerStarFemaleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IgniteSoccerStarFemaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
