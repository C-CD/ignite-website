import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { Observable, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { FunctionsService } from 'src/app/services/functions/functions.service';
import { LoadingService } from 'src/app/services/loader/loading.service';
import { MediaService } from 'src/app/services/media/media.service';
import { PlayerService } from 'src/app/services/players/player.service';
import {
  StatisticsService,
  StatsPlayer,
} from 'src/app/services/statistics/statistics.service';
import { Teams, TeamService } from 'src/app/services/team/team.service';
import { ToastrService } from 'src/app/services/toastr/toastr.service';
import { Votes, VotingService } from 'src/app/services/votings/voting.service';
import { CAN_VOTE } from 'src/environments/environment';


@Component({
  selector: 'app-player-showcase',
  templateUrl: './player-showcase.component.html',
  styleUrls: ['./player-showcase.component.css'],
})
export class PlayerShowcaseComponent implements OnInit {
  randomPlayers: any[] = []; // Randomly selected players
  showTeam = false;

  public theBoundCallback!: () => void;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toaster: ToastrService,
    public loadingService: LoadingService,
    public auth: AuthenticationService,
    public funcService: FunctionsService,
    private mediaService: MediaService,
    protected teamService: TeamService,
    private playerService: PlayerService,
    private statsService: StatisticsService,
    private votingService: VotingService
  ) {}

  ngOnInit(): void {
    this.theBoundCallback = this.refreshPlayers.bind(this);
    this.randomPlayers = [];
    this.fetchPlayers();

    this.route.params.subscribe((params) => {
      
    })
  }

  
  refreshPlayers() {
    // console.log('call back returned'); return;
    this.randomPlayers = [];
    this.fetchPlayers();
    // this.loadingService.quickLoader().then(() => {
    //   this.fetchPlayersByTeam(this.selectedTeam);
    //   this.loadingService.clearLoader();
    // });
  }

  // Fetch all players and randomly select 3
  async fetchPlayers() {
    return new Promise((resolve, reject) => {
      this.showTeam = true;
      this.loadingService.quickLoader().then(() => {
        this.playerService
        .collection()
        .get()
        .then((snapshots: any) => {
          let snapshots_data = this.funcService.handleSnapshot(snapshots);
          if (snapshots_data) {
            snapshots_data = [...snapshots_data].sort(() => 0.5 - Math.random());
            snapshots_data=snapshots_data.slice(0,3);
            console.log(snapshots_data)
            resolve(this.organizePlayerData(snapshots_data));
          } else {
            this.randomPlayers=snapshots_data
          }
          // console.log(this.players);
          this.loadingService.clearLoader();
        });
      });
    });
  }

  async organizePlayerData(players: any, parse = false) {
    let storePlayers: any = [];
    players.forEach((player: any) => {
      // team info
      this.fetchTeam(player.team).then((team_data) => {
        player.team_data = team_data;
        // media

        this.fetchVoteDetails(player.snap_id).then((votes) => {
          player.votes_data = votes;
          this.statsService
            .getPlayerStats(player.snap_id)
            .pipe(take(1))
            .subscribe((stats: any) => {
              player.stats = stats;

              player.date = moment(player.created).calendar();
              player.position_full = this.teamInfoPosition(player.position);
              this.addPlayer(player, storePlayers)
              //console.log('player')
              //storePlayers.push(player);
            });
        });

      });
    });

    if (!parse) {
      this.randomPlayers = storePlayers;
    }

    return storePlayers;
  }


    fetchVoteDetails(votee: string) {
      return new Promise((resolve) => {
        let data = {
          total: 0,
          amount: 0,
          points: 0,
        };
        this.votingService
          .collection()
          .where('votee', '==', votee)
          .get()
          .then((querySnap) => {
            let snapshots_data = this.funcService.handleSnapshot(querySnap);
            if (snapshots_data) {
              data.total = snapshots_data.reduce(
                (accumulator: any, current: Votes) =>
                  accumulator + current.quantity,
                0
              );
              data.amount = snapshots_data.reduce(
                (accumulator: any, current: Votes) =>
                  accumulator + current.amount,
                0
              );
              data.points = snapshots_data.reduce(
                (accumulator: any, current: Votes) =>
                  accumulator + current.points,
                0
              );
            }
  
            // console.log(data);
            resolve(data);
          });
      });
    }

    fetchTeam(id: string) {
      return new Promise<any>((resolve) => {
        this.teamService
          .getTeam(id)
          .pipe(take(1))
          .subscribe((data: any) => {
            // console.log(data);
  
            resolve(data);
          });
      });
    }

    teamInfoPosition(position: string) {
      if (position.toLowerCase() === 'gk') {
        return 'Goal Keeper';
      } else if (position.toLowerCase() === 'df') {
        return 'Defender';
      } else if (position.toLowerCase() === 'mf') {
        return 'Midfielder';
      } else if (position.toLowerCase() === 'fw') {
        return 'Forward';
      } else {
        return null;
      }
    }

    addPlayer(player: any, playerArray: any[]){
      this.fetchMedia(player.snap_id).then((media) => {
        player.media = media;
        playerArray.push(player);
        console.log(player);
      })
    }

    fetchMedia(id: string) {
      return new Promise((resolve) => {
        this.mediaService
          .getMedia(id)
          .pipe(take(1))
          .subscribe((data: any) => {
            // console.log((data && data.avatar) ? data : false, id);
            resolve(data && data.avatar ? data : null);
          });
      });
    }

    convertFirebaseUrlToCloudinary(firebaseUrl: string): string { 
      const regex = /https:\/\/firebasestorage.googleapis.com\/v0\/b\/[a-zA-Z0-9-_]+\.appspot\.com\/o\/(.+)\?alt=media/;
      const match = firebaseUrl.match(regex);
      
      if (!match) {
        throw new Error("Invalid Firebase Storage URL");
      }
    
      const cloudName = "dxkoqh2gz"; // Your Cloudinary cloud name
      
      // Extract the filename after '%2F' and decode it
      const fileName = decodeURIComponent(match[1].split('%2F').pop() || ''); 
    
      const cloudinaryUrl = `https://res.cloudinary.com/${cloudName}/image/upload/f_auto,q_auto/${fileName}`;
    
      return cloudinaryUrl;
    }
}