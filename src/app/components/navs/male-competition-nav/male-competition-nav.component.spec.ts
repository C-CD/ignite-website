import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaleCompetitionNavComponent } from './male-competition-nav.component';

describe('MaleCompetitionNavComponent', () => {
  let component: MaleCompetitionNavComponent;
  let fixture: ComponentFixture<MaleCompetitionNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaleCompetitionNavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaleCompetitionNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
