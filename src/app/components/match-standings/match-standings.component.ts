import { take } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { FunctionsService } from 'src/app/services/functions/functions.service';
import { LoadingService } from 'src/app/services/loader/loading.service';
import { Standing, StandingsService } from 'src/app/services/standings/standings.service';
import { Teams, TeamService } from 'src/app/services/team/team.service';
import { ToastrService } from 'src/app/services/toastr/toastr.service';
import * as moment from 'moment';

interface StandingsData extends Standing {
  team: { id: string, text: string, data: Teams }
  snap_id: string;
  date: string;
}

@Component({
  selector: 'app-match-standings',
  templateUrl: './match-standings.component.html',
  styleUrls: ['./match-standings.component.css']
})
export class MatchStandingsComponent implements OnInit {

  standings: StandingsData[] = [];

  constructor(
    public loadingService: LoadingService,
    private toaster: ToastrService,
    protected teamService: TeamService,
    private funcService: FunctionsService,
    public standingService: StandingsService
  ) { }

  ngOnInit(): void {
    this.fetchStandings();
  }

  fetchStandings() {
    this.loadingService.quickLoader().then(() => {
      this.standingService.getStandings().then((snapshots: any) => {
        let snapshots_data = this.funcService.handleSnapshot(snapshots);
        this.standings = this.organizeData(snapshots_data);
      }).catch(() => {
        this.toaster.quickToast({ msg: "No match standings yet found yet." });
      }).finally(() => {
        this.loadingService.clearLoader();
      });;
    }).catch(() => {
      this.loadingService.clearLoader();
    });
  }

  fetchTeam(id: string) {
    return new Promise((resolve) => {
      this.teamService.getTeam(id).pipe(take(1)).subscribe((data: any) => {
        resolve(data);
      });
    })
  }

  organizeData(standings: StandingsData[]) {
    let data = standings.map((standing) => {
      this.fetchTeam(standing.team.id).then((team_data) => {
        if (team_data) standing.team.data = (team_data as Teams);
      });

      standing.date = moment(standing.updated).calendar();
      return standing;
    });

    return data;
  }

}
