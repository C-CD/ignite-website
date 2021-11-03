import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IgniteSoccerStarMaleComponent } from './ignite-soccer-star-male.component';

describe('IgniteSoccerStarMaleComponent', () => {
  let component: IgniteSoccerStarMaleComponent;
  let fixture: ComponentFixture<IgniteSoccerStarMaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IgniteSoccerStarMaleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IgniteSoccerStarMaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
