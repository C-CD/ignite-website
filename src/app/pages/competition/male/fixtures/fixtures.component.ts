import { Fixtures, FixturesService, PlayersList } from './../../../../services/fixtures/fixtures.service';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { take } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { FunctionsService } from 'src/app/services/functions/functions.service';
import { LoadingService } from 'src/app/services/loader/loading.service';
import { MediaService } from 'src/app/services/media/media.service';
import { Teams, TeamService } from 'src/app/services/team/team.service';
import { Players, PlayerService } from 'src/app/services/players/player.service';
import { forEach } from 'lodash';

interface FixturesData extends Fixtures {
  snap_id: string;
  date: string;
  scorers: any[];
  match_time_fmt: string;
  home_team_data: Teams;
  away_team_data: Teams;
}

interface PlayerSnapExtend extends Players {
  snap_id: string;
}
@Component({
  selector: 'app-fixtures',
  templateUrl: './fixtures.component.html',
  styleUrls: ['./fixtures.component.css']
})
export class FixturesComponent implements OnInit {

  players: any[] = [];
  teams: any[] = [];
  fixtures: any | null = {};
  selected_fixture!: Fixtures;

  constructor(
    public loadingService: LoadingService,
    public auth: AuthenticationService,
    private funcService: FunctionsService,
    private mediaService: MediaService,
    protected teamService: TeamService,
    private fixturesService: FixturesService,
    private playerService: PlayerService,
  ) { }

  ngOnInit(): void {
    this.fetchTeams().then(() => {
      this.fetchPlayers().then(() => {
        this.fetchFixtures().then((fixtures: any) => {
          this.fixtures = this.groupByDate(fixtures);
          // this.fixtures = this.groupedByTime(fixtures);
          console.log(this.fixtures);
        }).catch((error) => {
          this.fixtures = null;
          // console.log(error);
        });
      });
    })
  }

  groupByDate(data: any) {
    let groupedDate: any = {};
    data.sort(function (a: any, b: any) { return (new Date(b.match_day)).getTime() - (new Date(a.match_day)).getTime() });
    for (let i = 0; i < data.length; i++) {
      let match_date = moment(data[i].match_day).format("dddd, MMMM Do YYYY");
      if (groupedDate[match_date]) {
        groupedDate[match_date].push(data[i]);
      } else {
        groupedDate[match_date] = [data[i]];
      }
    }

    return groupedDate;
  }

  groupedByTime(data: any) {
    let groupedTime: any = {};
    // sortbytime
    data.sort(function (a: any, b: any) { return (new Date(a.match_time)).getTime() - (new Date(b.match_time)).getTime() });
    for (let i = 0; i < data.length; i++) {
      let match_time = moment(data[i].match_time).format("h:mm a");
      if (groupedTime[match_time]) {
        groupedTime[match_time].push(data[i]);
      } else {
        groupedTime[match_time] = [data[i]];
      }
    }

    return groupedTime;
  }

  objectKeys() {
    return Object.keys(this.fixtures);
  }

  selectFixture(fixture: any) {
    console.log(fixture);
    this.selected_fixture = fixture;
  }

  fetchTeams() {
    return new Promise((resolve, reject) => {
      this.loadingService.quickLoader().then(() => {
        this.teamService.getTeams().then((snapshots: any) => {
          // console.log(snapshots);
          let snapshots_data = this.funcService.handleSnapshot(snapshots);
          this.teams = snapshots_data;
          resolve(snapshots_data)
          this.loadingService.clearLoader();
        });
      });
    });
  }

  fetchPlayers() {
    return new Promise((resolve, reject) => {
      this.loadingService.quickLoader().then(() => {
        this.playerService.getPlayers().then((snapshots: any) => {
          // console.log(snapshots);
          let snapshots_data = this.funcService.handleSnapshot(snapshots);
          this.players = snapshots_data
          resolve(snapshots_data)
          this.loadingService.clearLoader();
        });
      });
    });
  }

  fetchFixtures() {
    return new Promise((resolve, reject) => {
      this.loadingService.quickLoader().then(() => {
        this.fixturesService.getFixtures().then((snapshots: any) => {
          // console.log(snapshots);
          let snapshots_data = this.funcService.handleSnapshot(snapshots);
          // console.log('fixtures', snapshots_data);
          if (snapshots_data) {
            this.organizeFixturesData(snapshots_data, true).then((organizedData) => {
            console.log('fixtures', organizedData);
             //sort by id
             organizedData.sort(function(a: any,b: any){
                return (a.id - b.id);
             })

            
            resolve(organizedData);
            })
          } else {
            reject(snapshots_data);
          }
          // console.log(this.fixtures);
          this.loadingService.clearLoader();
        });
      });
    })

  }

  fetchPlayer(id: string) {
    return new Promise((resolve) => {
      if (id && id.length) {
        this.loadingService.quickLoader().then(() => {
          this.playerService.getPlayer(id).pipe(take(1)).subscribe((data: any) => {
            // console.log(data);
            resolve(data);   
          });
        })
      } else {
        resolve(null);
      }
    })
  }

  fetchMedia(id: string) {
    return new Promise((resolve) => {
      this.mediaService.getMedia(id).pipe(take(1)).subscribe((data: any) => {
        // console.log((data && data.avatar) ? data : false, id);
        resolve((data && data.avatar) ? data : null);
      });
    })
  }

  async organizeFixturesData(fixtures: FixturesData[], parse = false) {
    let storeFixtures: FixturesData[] = [];
    fixtures.forEach((f: FixturesData, i) => {
      const fixedFixture = f;
      let fixture = f;
      // console.log(this.teams, "teams")
      // team info
      fixture.home_team_data = this.teams.find((t: any) => (t.snap_id === fixture.home))
      fixture.away_team_data = this.teams.find((t: any) => (t.snap_id === fixture.away))
      // this check was added if teams had been deleted earlier

      // console.log("home_team: ", fixture?.home_team_data, "away_team: ", fixture?.away_team_data)
      if (fixture?.home_team_data && fixture?.away_team_data) {

        // format date
        // console.log(fixture.match_day + " " +fixture.match_time);
        fixture.date = moment(fixture.match_day).calendar();
        fixture.match_time_fmt = moment(fixture.match_day + " " + fixture.match_time).format('h:mm a');

        // update game states
        const matchStart = fixture.match_day + ' ' + (fixture.match_time ?? '00:00');
        const matchEnd = fixture.match_day + ' ' + (fixture.match_end_time ?? '00:00');
        const curTime = moment().format("YYYY-MM-DD hh:mm");

        const homeScorers = (fixture.scores?.home_scorers ?? []);
        const awayScorers = (fixture.scores?.away_scorers ?? []);
        let fixtureScorers: any[] = [];


        homeScorers.forEach((score: PlayersList) => {
          let player_id = String(score.id).split('_').pop();
          fixtureScorers.push({ ...score, player: player_id, team: fixture.home });
        });

        awayScorers.forEach((score: PlayersList, index: number) => {
          let player_id = String(score.id).split('_').pop();
          fixtureScorers.push({ ...score, player: player_id, team: fixture.away });
        });

        fixture.scorers = fixtureScorers;
      // console.log(curTime, matchStart, matchEnd);
      // console.log((curTime > matchStart && curTime < matchEnd), (curTime > matchEnd));

        // if match start time has finished update fixture time
        if (curTime > matchStart && curTime < matchEnd) {
          this.fixturesService.updateFixture(fixture.snap_id, {
            ...fixedFixture, status: 'on-going', updated: moment().format()
          }).then(() => {
            fixture.status = 'on-going';
          });
        }
        // if match end time has finished update fixture time
        if (curTime > matchEnd) {
          this.fixturesService.updateFixture(fixture.snap_id, {
            ...fixedFixture, status: 'played', updated: moment().format()
          }).then(() => {
            fixture.status = 'played';
          });
        }

      storeFixtures.push(fixture);
      }
    });

    return storeFixtures;
  }




}
