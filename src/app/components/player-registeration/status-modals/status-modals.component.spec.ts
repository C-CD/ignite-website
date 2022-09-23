import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusModalsComponent } from './status-modals.component';

describe('StatusModalsComponent', () => {
  let component: StatusModalsComponent;
  let fixture: ComponentFixture<StatusModalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatusModalsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusModalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
