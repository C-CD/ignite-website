import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachesAllComponent } from './coaches-all.component';

describe('CoachesAllComponent', () => {
  let component: CoachesAllComponent;
  let fixture: ComponentFixture<CoachesAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoachesAllComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoachesAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
