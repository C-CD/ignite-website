import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { take } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { FunctionsService } from 'src/app/services/functions/functions.service';
import { LoadingService } from 'src/app/services/loader/loading.service';
import { MediaService } from 'src/app/services/media/media.service';
import { PlayerService } from 'src/app/services/players/player.service';
import { StatisticsService } from 'src/app/services/statistics/statistics.service';
import { TeamService } from 'src/app/services/team/team.service';
import { ToastrService } from 'src/app/services/toastr/toastr.service';
import { Votes, VotingService } from 'src/app/services/votings/voting.service';

@Component({
  selector: 'app-male-evictions',
  templateUrl: './male-evictions.component.html',
  styleUrls: [
    './male-evictions.component.css',
    '../players/players.component.css'
  ]
})
export class MaleEvictionsComponent implements OnInit {

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
    private playerService: PlayerService,
    private statsService: StatisticsService,
    private votingService: VotingService
  ) { }

  ngOnInit(): void {
    // this.fetchTeams();
    this.fetchPlayers().then((players) => {
      this.players = players;
    }).catch((error) => {
      console.log(error);
      this.players = null;
    });
  }

  selectPlayer(player: any) {
    console.log(player);
    this.selected_player = player;
  }

  fetchPlayers() {
    return new Promise((resolve, reject) => {
      this.showTeam = true;
      this.loadingService.quickLoader().then(() => {
        this.playerService.getPlayers().then((snapshots: any) => {
          console.log(snapshots);

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

  fetchPlayersByTeam(team: any) {
    this.showTeam = false;
    this.selectedTeam = team;
    this.players = [];
    this.loadingService.quickLoader().then(() => {
      this.playerService.collection().where("team", "==", team.snap_id).get().then((snapshots: any) => {
        // console.log(snapshots);

        let snapshots_data = this.funcService.handleSnapshot(snapshots);
        if (snapshots_data) {
          let playersOrdered = this.orderPlayers(snapshots_data);
          this.organizePlayerData(playersOrdered);
          // this.players = null;
        } else {
          this.players = snapshots_data;
        }
        // console.log(this.players);
        this.loadingService.clearLoader();
      });
    });
  }

  fetchTeam(id: string) {
    return new Promise((resolve) => {
      if (id && id.length) {
        this.teamService.getTeam(id).pipe(take(1)).subscribe((data: any) => {
          // console.log(data);
          resolve(data);
        });
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

  fetchStats(id: string) {
    return new Promise((resolve) => {
      this.statsService.getPlayerStats(id).pipe(take(1)).subscribe((stats: any) => {
        resolve(stats);
      })
    });
  }

  fetchVoteDetails(votee: string) {
    return new Promise((resolve) => {
      let data = {
        total: 0,
        amount: 0,
        points: 0
      };
      this.votingService.collection()
        .where("votee", "==", votee)
        .get().then((querySnap) => {
          let snapshots_data = this.funcService.handleSnapshot(querySnap);
          if (snapshots_data) {
            data.total = snapshots_data.reduce((accumulator: any, current: Votes) => accumulator + current.quantity, 0);
            data.amount = snapshots_data.reduce((accumulator: any, current: Votes) => accumulator + current.amount, 0);
            data.points = snapshots_data.reduce((accumulator: any, current: Votes) => accumulator + current.points, 0);
          }

          // console.log(data);
          resolve(data);
        })
    })
  }

  async organizePlayerData(players: any, parse = false) {
    let storePlayers: any = [];
    for (let i = 0; i < players.length; i++) {
      let player = players[i];
      player.stats = await this.fetchStats(player.snap_id);
      if (player.stats && (player.stats.eviction === "on-going")) {
        // team info
        this.fetchTeam(player.team).then((team_data) => {
          player.team_data = team_data;
          // media
          this.fetchMedia(player.snap_id).then((media) => {
            player.media = media;
            // format date
            this.fetchVoteDetails(player.snap_id).then((votes) => {
              player.votes_data = votes;

              player.date = moment(player.created).calendar();
              player.position_full = this.teamInfoPosition(player.position);
              storePlayers.push(player);
            })
          });
        });
      }
    };

    console.log(storePlayers);

    if (!parse) {
      this.players = (storePlayers.length) ? storePlayers : null;
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

  orderPlayers(players: any) {
    let requiredFormat = ['gk', 'df', 'mf', 'fw'];
    let formatted: any[] = [];

    requiredFormat.forEach((position) => {
      let filtered = players.filter((player: any) => {
        // console.log(player.position, position);
        return (player.position.toLowerCase() === position);
      });

      formatted = [...formatted, ...filtered];
    });

    // console.log(formatted);
    return formatted;
  }

  teamInfoPosition(position: string) {
    if (position.toLowerCase() === "gk") {
      return "Goal Keeper";
    } else if (position.toLowerCase() === "df") {
      return "Defender"
    } else if (position.toLowerCase() === "mf") {
      return "Midfielder"
    } else if (position.toLowerCase() === "fw") {
      return "Forward"
    } else {
      return null;
    }
  }

  searchPlayer() {
    // console.log(this.searchInput);
    this.players = [];
    this.fetchPlayers().then((players: any) => {
      console.log(players, players.length);
      players.forEach((player: any) => {
        console.log(player);
        let checks = {
          team: player.team_data.name.includes(this.searchInput),
          name: (player.fname.includes(this.searchInput) || player.lname.includes(this.searchInput)),
        };
        console.log(checks);
        if (checks.team || checks.name) {
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
