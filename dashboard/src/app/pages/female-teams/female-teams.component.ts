import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { FirebaseAuthService } from 'src/app/services/firebase-auth/firebase-auth.service';
import { LoadingService } from 'src/app/services/loader/loading.service';
import { TeamService } from 'src/app/services/team/team.service';
import { ToastrService } from 'src/app/services/toastr/toastr.service';

@Component({
  selector: 'app-female-teams',
  templateUrl: './female-teams.component.html',
  styleUrls: ['./female-teams.component.scss']
})
export class FemaleTeamsComponent implements OnInit {

  teams: any;
  year: string = moment().format("Y");

  constructor(
    public firebaseAuth: FirebaseAuthService,
    public loadingService: LoadingService,
    private toaster: ToastrService,
    protected teamService: TeamService
  ) { }

  ngOnInit(): void {
    this.fetchTeams();
  }

  fetchTeams() {
    this.loadingService.quickLoader().then(() => {
      this.teamService.collection().where("gender", "==", "female").where("year", "==", this.year).get().then((snapshots) => {
        console.log(snapshots);

        if (snapshots && snapshots.size) {
          this.teams = [];
          snapshots.docs.forEach((snapshot: any) => {
            let data = snapshot.data();
            this.teams.push({
              name: data.name,
              gender: data.gender,
              year: data.year,
              players: 0,
              date: moment(data.created).calendar()
            })
          });
        }


        this.loadingService.clearLoader();
      });
    });
  }

}
