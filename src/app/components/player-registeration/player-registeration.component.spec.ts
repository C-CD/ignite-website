import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerRegisterationComponent } from './player-registeration.component';

describe('PlayerRegisterationComponent', () => {
  let component: PlayerRegisterationComponent;
  let fixture: ComponentFixture<PlayerRegisterationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayerRegisterationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerRegisterationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
