import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FixturesModalComponent } from './fixtures-modal.component';

describe('FixturesModalComponent', () => {
  let component: FixturesModalComponent;
  let fixture: ComponentFixture<FixturesModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FixturesModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FixturesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
