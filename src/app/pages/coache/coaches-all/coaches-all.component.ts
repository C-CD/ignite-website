import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { take } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { CoachesService } from 'src/app/services/coaches/coaches.service';
import { FunctionsService } from 'src/app/services/functions/functions.service';
import { LoadingService } from 'src/app/services/loader/loading.service';
import { MediaService } from 'src/app/services/media/media.service';
import { TeamService } from 'src/app/services/team/team.service';
import { ToastrService } from 'src/app/services/toastr/toastr.service';

@Component({
  selector: 'app-coaches-all',
  templateUrl: './coaches-all.component.html',
  styleUrls: ['./coaches-all.component.css']
})
export class CoachesAllComponent implements OnInit {

  coaches: any = [];
  selected_coach: any = null;
  teams: any[] = [];
  showTeam = false;
  selectedTeam: any;
  searchInput: string = '';

  constructor(
    private toaster: ToastrService,
    public loadingService: LoadingService,
    public auth: AuthenticationService,
    private funcService: FunctionsService,
    private mediaService: MediaService,
    protected teamService: TeamService,
    private coachesService: CoachesService
  ) { }

  ngOnInit(): void {
    this.fetchCoaches().then((coaches) => {
      this.coaches = coaches;
    }).catch((error) => {
      this.coaches = null;
      console.log(error);
    });
  }

  selectCoach(coach: any) {
    console.log(coach);
    this.selected_coach = coach;
  }

  fetchCoaches() {
    return new Promise((resolve, reject) => {
      this.showTeam = true;
      this.loadingService.quickLoader().then(() => {
        this.coachesService.getCoaches().then((snapshots: any) => {
          // console.log(snapshots);

          let snapshots_data = this.funcService.handleSnapshot(snapshots);
          if (snapshots_data) {
            resolve(this.organizeCoachesData(snapshots_data, true));
          } else {
            reject(snapshots_data);
          }
          // console.log(this.coaches);
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

  async organizeCoachesData(coaches: any, parse = false) {
    let storeCoaches: any = [];
    for (let i = 0; i < coaches.length; i++) {
      let coach = coaches[i];
      // team info
      coach.team_data = await this.fetchTeam(coach.team);
      // media
      coach.media = await this.fetchMedia(coach.snap_id);
      // format date
      coach.date = moment(coach.created).calendar();
      storeCoaches.push(coach);
    }

    if (!parse) {
      this.coaches = storeCoaches;
    }

    return storeCoaches;
  }


  searchCoach() {
    console.log(this.searchInput);
    this.coaches = [];
    this.fetchCoaches().then((coaches: any) => {
      console.log(coaches, coaches.length);
      coaches.forEach((coach: any) => {
        console.log(coach);
        let checks = {
          team: (coach.team_data.name).toLowerCase().includes(this.searchInput),
          name: (coach.name).toLowerCase().includes(this.searchInput)
        };
        console.log(checks);
        if (checks.team || checks.name) {
          this.coaches.push(coach);
        }
      });

      this.coaches = (this.coaches.length) ? this.coaches : null;

    }).catch((error) => {
      console.log(error);
      this.coaches = error;
    })
  }

}
