import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MalePlayersComponent } from './male-players.component';

describe('MalePlayersComponent', () => {
  let component: MalePlayersComponent;
  let fixture: ComponentFixture<MalePlayersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MalePlayersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MalePlayersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
