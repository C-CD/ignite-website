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

  players: any[] = [];
  view_player: any = null;
  vote_player: any = null;

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
    this.fetchPlayers();
  }

  viewPlayer(player: any) {
    console.log(player);
    this.view_player = player;
  }

  votePlayer(player: any) {
    this.vote_player = player;
  }

  fetchPlayers() {
    this.loadingService.quickLoader().then(() => {
      this.playerService.getPlayers().then((snapshots: any) => {
        // console.log(snapshots);

        let snapshots_data = this.funcService.handleSnapshot(snapshots);
        this.organizePlayerData(snapshots_data);
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
        resolve((data && data.avatar) ? data : false);
      });
    })
  }

  organizePlayerData(players: any) {
    this.players = [];
    players.forEach((player: any) => {
      // team info
      this.fetchTeam(player.team).then((team_data) => {
        player.team_data = team_data;
        // media
        this.fetchMedia(player.snap_id).then((media) => {
          player.media = media;
          // format date
          player.date = moment(player.created).calendar();
          this.players.push(player);
        });
      });
    });
  }





}
