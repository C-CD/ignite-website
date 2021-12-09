import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PointIndicatorComponent } from './point-indicator.component';

describe('PointIndicatorComponent', () => {
  let component: PointIndicatorComponent;
  let fixture: ComponentFixture<PointIndicatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PointIndicatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PointIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
