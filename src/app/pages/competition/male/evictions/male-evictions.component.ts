import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { take } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { Fixtures, FixturesService } from 'src/app/services/fixtures/fixtures.service';
import { FunctionsService } from 'src/app/services/functions/functions.service';
import { LoadingService } from 'src/app/services/loader/loading.service';
import { MediaService } from 'src/app/services/media/media.service';
import { PlayerService } from 'src/app/services/players/player.service';
import { StatisticsService } from 'src/app/services/statistics/statistics.service';
import { Teams, TeamService } from 'src/app/services/team/team.service';
import { ToastrService } from 'src/app/services/toastr/toastr.service';
import { Votes, VotingService } from 'src/app/services/votings/voting.service';


interface SnapExtendFixture extends Fixtures {
  snap_id: string;
  home_team?: Teams,
  away_team?: Teams,
  date: string;
}
@Component({
  selector: 'app-male-evictions',
  templateUrl: './male-evictions.component.html',
  styleUrls: [
    './male-evictions.component.css',
    '../players/players.component.css'
  ]
})
export class MaleEvictionsComponent implements OnInit {

  games: any = [];
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
    private votingService: VotingService,
    private fixturesService: FixturesService,

  ) { }

  ngOnInit(): void {
    this.fetchTeams();
    this.fetchPlayers().then((players) => {
      this.players = players;
      this.fetchFixtures().then((games: any) => {
        // console.log(games)
        this.games = games
      }).catch((error) => {
        // console.log(error)
        this.toaster.globalErrorToast()
        this.games = null
      })
    }).catch((error) => {
      // console.log(error);
      this.players = null;
    });


  }

  fetchFixtures() {
    return new Promise((resolve, reject) => {
      this.loadingService.quickLoader().then(() => {
        this.fixturesService.collection().where('substitutions', '!=', []).get().then((snapshots: any) => {
          // console.log(snapshots);
          let snapshots_data = this.funcService.handleSnapshot(snapshots);
          // console.log(snapshots_data);
          if (snapshots_data) {
            resolve(this.organizeFixturesData(snapshots_data));
          } else {
            reject(snapshots_data);
          }
          // console.log(this.fixtures);
          this.loadingService.clearLoader();
        });
      });
    })

  }

  async organizeFixturesData(fixtures: SnapExtendFixture[]) {
    const curTime = moment().format("YYYY-MM-DD hh:mm");
    fixtures.sort((a, b) => (Number(b.id) - Number(a.id)));
    let storeFixtures: any[] = fixtures.map((fixture) => {
      // fetch teams info
      fixture.home_team = this.teams.find((t: any) => t.snap_id === fixture.home)
      fixture.away_team = this.teams.find((t: any) => t.snap_id === fixture.away)


      fixture.date = moment(fixture.match_day).calendar();
      const matchEnd = fixture.match_day + ' ' + (fixture.match_end_time ?? '00:00');

      fixture.substitutions = (fixture.substitutions ?? []).map((sub, index: number) => {
        let subExt = sub;
        subExt.player_data = this.players.find((p: any) => p.snap_id === sub.player)
        return subExt
      })

      // fixture.substitutions = (fixture.substitutions).map((sub, index: number) => {
      //   let subExt = sub;
      //   subExt.player_data = this.players.find((p: any) => p.snap_id === sub.player)
      //   return subExt
      // })

      return fixture;
    })

    return storeFixtures
  }

  fetchPlayer(id: string) {
    return new Promise((resolve) => {
      if (id && id.length) {
        this.loadingService.quickLoader().then(() => {
          this.playerService.getPlayer(id).pipe(take(1)).subscribe((data: any) => {
            // console.log(data);
            resolve(data);
          });
        })
      } else {
        resolve(null);
      }
    })
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

  async organizePlayerData(players: any[], parse = false) {
    let storePlayers: any[]|null = players.map((player) =>  {
      let playerExt = player;

      playerExt.date = moment(player.created).calendar();
      playerExt.position_full = this.teamInfoPosition(player.position);

      this.fetchStats(player.snap_id).then((stats) => (playerExt.stats = stats));
      // team info
      playerExt.team_data = this.teams.find((team) => (team.snap_id === player.team));
        // media info
      this.fetchMedia(player.snap_id).then((media) => (playerExt.media = media));
            // vote details
      this.fetchVoteDetails(player.snap_id).then((votes) => (playerExt.media = votes));

      return playerExt;
    });

    // console.log(storePlayers);

    if (!parse) storePlayers = (storePlayers.length) ? storePlayers : null;

    return storePlayers;
  }

  fetchTeams() {
    this.loadingService.quickLoader().then(() => {
      this.teamService.collection().get().then((snapshots: any) => {
        // console.log(snapshots);
        this.teams = this.funcService.handleSnapshot(snapshots);
        // this.selectedTeam = this.teams[0];
        // this.fetchPlayersByTeam(this.selectedTeam);
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
      // console.log(players, players.length);
      players.forEach((player: any) => {
        // console.log(player);
        let checks = {
          team: player.team_data.name.includes(this.searchInput),
          name: (player.fname.includes(this.searchInput) || player.lname.includes(this.searchInput)),
        };
        // console.log(checks);
        if (checks.team || checks.name) {
          this.players.push(player);
        }
      });


      this.players = (this.players.length) ? this.players : null;

    }).catch((error) => {
      // console.log(error);
      this.players = error;
    })
  }

}
