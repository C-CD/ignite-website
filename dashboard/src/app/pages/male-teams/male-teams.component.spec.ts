import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaleTeamsComponent } from './male-teams.component';

describe('MaleTeamsComponent', () => {
  let component: MaleTeamsComponent;
  let fixture: ComponentFixture<MaleTeamsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaleTeamsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaleTeamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
