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
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css'],
})
export class PlayersComponent implements OnInit {
  players: any = [];
  selected_player: any = null;
  teams: any[] = [];
  showTeam = false;
  selectedTeam: any;
  searchInput: string = '';
  checkPlayerSubscription = Observable;
  canVote = CAN_VOTE;

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
  ) { }

  ngOnInit(): void {

    this.theBoundCallback = this.refreshPlayers.bind(this);
    // this.fetchPlayers();
    this.route.params.subscribe((params) => {
      const team_id = params['team'];
      const player_id = params['player'];

      if (team_id) {
        this.loadingService.quickLoader().then(() => {
          this.teamService.collection().where('ref', '==', team_id).get().then((snapshots: any) => {
            let snapshots_data = this.funcService.handleSnapshot(snapshots);
            // console.log(snapshots_data)
            if (snapshots_data) {
              const team = snapshots_data[0];
              // this.fetchPlayersByTeam({ ...team, snap_id: team.snap_id });
              this.selectedTeam = { ...team, snap_id: team.snap_id };
              localStorage.setItem('selectedTeam', team.snap_id);
            }
          }).catch(() => {
            console.log('team not found');
          }).finally(() => {
            this.loadingService.clearLoader();
            this.fetchTeams();
          });
        });
      }

      if (player_id) {
        this.loadingService.quickLoader().then(() => {
          this.fetchPlayer(player_id)
            .then((player) => {
              // console.log(player);
              if (player) {
                this.selectPlayer(player);
                const observable = new Observable<JQuery<HTMLElement>>(
                  (sub) => {
                    setInterval(() => {
                      sub.next($('#player-view-' + player.snap_id));

                      if ($('#player-view-' + player.snap_id).html()) {
                        sub.complete();
                      }
                    }, 1500);

                    setTimeout(() => {
                      sub.complete();
                    }, 10000);
                  }
                );

                observable.subscribe({
                  next: (x) => {
                    // console.log(x);
                    if (x) x.click();
                  },
                });
              }
            })
            .catch(() => {
              console.log('player not found');
            })
            .finally(() => {
              this.loadingService.clearLoader();
            });
        });
      }
    });
  }

  //   ngOnDestroy() {
  //     this.checkPlayerSubscription.unsubscribe()
  // }

  refreshPlayers() {
    // console.log('call back returned'); return;
    this.teams = [];
    this.fetchTeams();
    // this.loadingService.quickLoader().then(() => {
    //   this.fetchPlayersByTeam(this.selectedTeam);
    //   this.loadingService.clearLoader();
    // });
  }

  selectPlayer(player: any) {
    // console.log(player);
    this.selected_player = player;
  }

  fetchPlayers() {
    return new Promise((resolve, reject) => {
      this.showTeam = true;
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
    });
  }

  fetchPlayersByTeam(team: any) {
    this.showTeam = false;
    // if (team !== this.selectedTeam) {
      this.selectedTeam = team;
      // console.log(team)
      this.router.navigate([`/competition/male/${team.ref}/players`], { queryParams: { q: team.name } });
      localStorage.setItem('selectedTeam', team.snap_id);
    // }

    this.players = [];

    this.loadingService.quickLoader().then(() => {
      this.playerService
        .collection()
        .where('team', '==', team.snap_id)
        .get()
        .then((snapshots: any) => {
          // console.log(snapshots);

          let snapshots_data = this.funcService.handleSnapshot(snapshots);
          if (snapshots_data) {
            let playersOrdered = this.orderPlayers(snapshots_data);
            this.organizePlayerData(playersOrdered);
          } else {
            this.players = snapshots_data;
          }
          // console.log(this.players);
          this.loadingService.clearLoader();
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

  fetchPlayer(id: string) {
    return new Promise<any>((resolve) => {
      this.playerService
        .getPlayer(id)
        .pipe(take(1))
        .subscribe((data: any) => {
          // console.log(data);
          let player = { ...data, snap_id: id };

          this.getOtherPlayerData(player).then((details) => {
            resolve(details);
          });
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

  getOtherPlayerData(player: any) {
    let playerDetails = { ...player };
    return new Promise((resolve) => {
      this.fetchTeam(player.team).then((team_data) => {
        playerDetails.team_data = team_data;
        // media
        this.fetchMedia(player.snap_id).then((media) => {
          playerDetails.media = media;
          // format date
          this.fetchVoteDetails(player.snap_id).then((votes) => {
            playerDetails.votes_data = votes;
            this.statsService
              .getPlayerStats(player.snap_id)
              .pipe(take(1))
              .subscribe((stats: any) => {
                playerDetails.stats = stats;

                playerDetails.date = moment(player.created).calendar();
                playerDetails.position_full = this.teamInfoPosition(
                  player.position
                );
                resolve(playerDetails);
              });
          });
        });
      });
    });
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
          this.fetchVoteDetails(player.snap_id).then((votes) => {
            player.votes_data = votes;
            this.statsService
              .getPlayerStats(player.snap_id)
              .pipe(take(1))
              .subscribe((stats: any) => {
                player.stats = stats;

                player.date = moment(player.created).calendar();
                player.position_full = this.teamInfoPosition(player.position);
                storePlayers.push(player);
              });
          });
        });
      });
    });

    if (!parse) {
      this.players = storePlayers;
    }

    return storePlayers;
  }

  orderPlayers(players: any) {
    let requiredFormat = ['gk', 'df', 'mf', 'fw'];
    let formatted: any[] = [];

    requiredFormat.forEach((position) => {
      let filtered = players.filter((player: any) => {
        // console.log(player.position, position);
        return player.position.toLowerCase() === position;
      });

      formatted = [...formatted, ...filtered];
    });

    // console.log(formatted);
    return formatted;
  }

  fetchTeams() {
    this.loadingService.quickLoader().then(() => {
      this.teamService
        .collection()
        .get()
        .then((snapshots: any) => {
          // console.log(snapshots);
          this.teams = this.funcService.handleSnapshot(snapshots);
          this.teams = this.teams.sort((a, b) => a?.index - b?.index);

          const storedTeam = localStorage.getItem('selectedTeam');
          if (storedTeam) {
            this.fetchTeam(storedTeam).then((team: any) => {
              if (team) {
                const teamData = { snap_id: storedTeam, ...team };
                this.fetchPlayersByTeam(teamData);
                this.selectedTeam = teamData;
              }
            });
          } else {
            this.fetchPlayersByTeam(this.teams[0]);
            this.selectedTeam = this.teams[0];
          }

          this.loadingService.clearLoader();
        });
    });
  }

  searchPlayer() {
    console.log(this.searchInput);
    this.players = [];
    this.fetchPlayers()
      .then((players: any) => {
        console.log(players, players.length);
        players.forEach((player: any) => {
          console.log(player);
          let checks = {
            team: player.team_data.name
              .toLowerCase()
              .includes(this.searchInput),
            name:
              player.fname.toLowerCase().includes(this.searchInput) ||
              player.lname.toLowerCase().includes(this.searchInput),
          };
          console.log(checks);
          if (checks.team || checks.name) {
            this.players.push(player);
          }
        });

        this.players = this.players.length ? this.players : null;
      })
      .catch((error) => {
        console.log(error);
        this.players = error;
      });
  }
}
