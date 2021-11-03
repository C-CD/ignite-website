import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostIgniteTeamVisitsRadianceFootballClubComponent } from './post-ignite-team-visits-radiance-football-club.component';

describe('PostIgniteTeamVisitsRadianceFootballClubComponent', () => {
  let component: PostIgniteTeamVisitsRadianceFootballClubComponent;
  let fixture: ComponentFixture<PostIgniteTeamVisitsRadianceFootballClubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostIgniteTeamVisitsRadianceFootballClubComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostIgniteTeamVisitsRadianceFootballClubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
