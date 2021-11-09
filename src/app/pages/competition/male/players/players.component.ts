import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { take } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { FunctionsService } from 'src/app/services/functions/functions.service';
import { LoadingService } from 'src/app/services/loader/loading.service';
import { MediaService } from 'src/app/services/media/media.service';
import { PlayerService } from 'src/app/services/players/player.service';
import { TeamService } from 'src/app/services/team/team.service';
import { ToastrService } from 'src/app/services/toastr/toastr.service';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit {

  players: any = [];
  selected_player: any = null;
  teams: any[] = [];
  showTeam = false;
  selectedTeam: any;
  searchInput: string = '';

  constructor(
    private route: ActivatedRoute,
    private toaster: ToastrService,
    public loadingService: LoadingService,
    public auth: AuthenticationService,
    private funcService: FunctionsService,
    private mediaService: MediaService,
    protected teamService: TeamService,
    private playerService: PlayerService
  ) { }

  ngOnInit(): void {
    this.fetchTeams();
    // this.fetchPlayers();
  }

  selectPlayer(player: any) {
    console.log(player);
    this.selected_player = player;
  }

  fetchPlayers() {
    return new Promise((resolve, reject) => {
      this.loadingService.quickLoader().then(() => {
        this.playerService.getPlayers().then((snapshots: any) => {
          // console.log(snapshots);

          let snapshots_data = this.funcService.handleSnapshot(snapshots);
          if (snapshots_data) {
            resolve(this.organizePlayerData(snapshots_data, true));
          } else {
            reject(snapshots_data);
          }
          // console.log(this.players);
          this.loadingService.clearLoader();
        });
      });
    })

  }

  fetchPlayersByTeam(team:any) {
    this.selectedTeam = team;
    this.players = [];
    this.loadingService.quickLoader().then(() => {
      this.playerService.collection().where("team", "==", team.snap_id).get().then((snapshots: any) => {
        // console.log(snapshots);

        let snapshots_data = this.funcService.handleSnapshot(snapshots);
        if(snapshots_data){
          this.organizePlayerData(snapshots_data);
        }else{
          this.players = snapshots_data;
        }
        // console.log(this.players);
        this.loadingService.clearLoader();
      });
    });
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

  organizePlayerData(players: any, parse = false) {
    let storePlayers: any = [];
    players.forEach((player: any) => {
      // team info
      this.fetchTeam(player.team).then((team_data) => {
        player.team_data = team_data;
        // media
        this.fetchMedia(player.snap_id).then((media) => {
          player.media = media;
          // format date
          player.date = moment(player.created).calendar();
          storePlayers.push(player);
        });
      });
    });

    if (!parse) {
      this.players = storePlayers;
    }

    return storePlayers;
  }

  fetchTeams() {
    this.loadingService.quickLoader().then(() => {
      this.teamService.collection().get().then((snapshots: any) => {
        console.log(snapshots);
        this.teams = this.funcService.handleSnapshot(snapshots);
        this.selectedTeam = this.teams[0];
        this.fetchPlayersByTeam(this.selectedTeam);
        this.loadingService.clearLoader();
      });
    });
  }

  searchPlayer(){
    console.log(this.searchInput);
    this.players = [];
    this.fetchPlayers().then((players:any) => {
      console.log(players, players.length);
      players.forEach((player: any) => {
        console.log(player);
        let checks = {
          team: player.team_data.name.includes(this.searchInput),
          name: (player.fname.includes(this.searchInput) || player.lname.includes(this.searchInput)),
        };
        console.log(checks);
        if (checks.team || checks.name){
          this.players.push(player);
        }
      });

      this.players = (this.players.length) ? this.players : null;

    }).catch((error) => {
      console.log(error);
      this.players = error;
    })
  }

}
