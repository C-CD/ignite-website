import { Fixtures, FixturesService } from './../../../../services/fixtures/fixtures.service';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { take } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { FunctionsService } from 'src/app/services/functions/functions.service';
import { LoadingService } from 'src/app/services/loader/loading.service';
import { MediaService } from 'src/app/services/media/media.service';
import { Teams, TeamService } from 'src/app/services/team/team.service';

interface FixturesData extends Fixtures{
  date: string;
  home_team_data: Teams;
  away_team_data: Teams;
}
@Component({
  selector: 'app-fixtures',
  templateUrl: './fixtures.component.html',
  styleUrls: ['./fixtures.component.css']
})
export class FixturesComponent implements OnInit {
  fixtures: any|null = {};
  selected_fixture!: Fixtures;

  constructor(
    public loadingService: LoadingService,
    public auth: AuthenticationService,
    private funcService: FunctionsService,
    private mediaService: MediaService,
    protected teamService: TeamService,
    private fixturesService: FixturesService
  ) { }

  ngOnInit(): void {
    this.fetchFixtures().then((fixtures: any) => {
      this.fixtures = this.groupByDate(fixtures);
      console.log(this.fixtures);
    }).catch((error) => {
      this.fixtures = null;
      console.log(error);
    });
  }

  groupByDate(data: any){
    let groupedDate:any = {};
    data.sort(function (a: any, b: any) { return (new Date(b.match_day)).getTime() - (new Date(a.match_day)).getTime() });
    for(let i = 0; i < data.length; i++){
      let match_date = moment(data[i].match_day).format("dddd, MMMM Do YYYY");
      if (groupedDate[match_date]){
        groupedDate[match_date].push(data[i]);
      }else{
        groupedDate[match_date] = [data[i]];
      }
    }

    return groupedDate;
  }

  objectKeys(){
    return Object.keys(this.fixtures);
  }

  selectFixture(fixture: any) {
    console.log(fixture);
    this.selected_fixture = fixture;
  }

  fetchFixtures() {
    return new Promise((resolve, reject) => {
      this.loadingService.quickLoader().then(() => {
        this.fixturesService.getFixtures().then((snapshots: any) => {
          // console.log(snapshots);

          let snapshots_data = this.funcService.handleSnapshot(snapshots);
          if (snapshots_data) {
            resolve(this.organizeFixturesData(snapshots_data, true));
          } else {
            reject(snapshots_data);
          }
          // console.log(this.fixtures);
          this.loadingService.clearLoader();
        });
      });
    })

  }

  fetchTeam(id: string) {
    return new Promise((resolve) => {
      this.teamService.getTeam(id).pipe(take(1)).subscribe((data: any) => {
        // console.log(data);

        resolve(data);
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

  async organizeFixturesData(fixtures: any, parse = false){
    let storeFixtures: FixturesData[] = [];
    for (let i = 0; i < fixtures.length; i++) {
      let fixture = fixtures[i];
      // team info
      fixture.home_team_data = await this.fetchTeam(fixture.home);
      fixture.away_team_data = await this.fetchTeam(fixture.away);

      // format date
      fixture.date = moment(fixture.match_day).calendar();
      storeFixtures.push(fixture);
    }

    // if (!parse) {
    //   this.fixtures = storeFixtures;
    // }

    return storeFixtures;
  }

}
