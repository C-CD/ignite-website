import { Fixtures, FixturesService } from './../../../../services/fixtures/fixtures.service';
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
          // console.log(this.fixtures);
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
            const organizedData = this.organizeFixturesData(snapshots_data, true)
            console.log('fixtures', organizedData);
            resolve(organizedData);
          } else {
            reject(snapshots_data);
          }
          // console.log(this.fixtures);
          this.loadingService.clearLoader();
        });
      });
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
      fixture.home_team_data = this.teams.find((t: any) => t.snap_id === fixture.home)
      fixture.away_team_data = this?.teams?.find((t: any) => t.snap_id === fixture.away)
      // format date
      // console.log(fixture.match_day + " " +fixture.match_time);
      fixture.date = moment(fixture.match_day).calendar();
      fixture.match_time_fmt = moment(fixture.match_day + " " + fixture.match_time).format('h:mm a');

      // update game states
      const matchStart = fixture.match_day + ' ' + (fixture.match_time ?? '00:00');
      const matchEnd = fixture.match_day + ' ' + (fixture.match_end_time ?? '00:00');
      const curTime = moment().format("YYYY-MM-DD hh:mm");

      fixture.scorers = (fixture.scorers ?? []).map((score: any, index: number) => {
        let subExt = score;
        subExt.player_data = this.players.find((p: any) => p.snap_id === score.player)
        return subExt
      })

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
    });

    return storeFixtures;
  }




}
