import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FemalePlayersComponent } from './female-players.component';

describe('FemalePlayersComponent', () => {
  let component: FemalePlayersComponent;
  let fixture: ComponentFixture<FemalePlayersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FemalePlayersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FemalePlayersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
