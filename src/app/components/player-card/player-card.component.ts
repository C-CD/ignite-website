import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FunctionsService } from 'src/app/services/functions/functions.service';
import { Media } from 'src/app/services/media/media.service';
import { Players } from 'src/app/services/players/player.service';
import { StatsPlayer } from 'src/app/services/statistics/statistics.service';
import { Teams } from 'src/app/services/team/team.service';
import { Votes } from 'src/app/services/votings/voting.service';
import { CAN_VOTE } from 'src/environments/environment';

export interface  PlayerSnapExtend extends Players{
  snap_id: string;
  team_data?: Teams,
  votes_data?: Votes,
  stats?: StatsPlayer,
  media?: Media,
  date?: string,
  position_full?: string
}


@Component({
  selector: 'app-player-card',
  templateUrl: './player-card.component.html',
  styleUrls: ['./player-card.component.css']
})
export class PlayerCardComponent implements OnInit {

  @Input() player!: PlayerSnapExtend;
  @Input() fetchTeam?: boolean = false;
  @Input() fetchMedia?: boolean = false;
  @Input() fetchStats?: boolean = false;
  @Output() onSelect: EventEmitter<any> = new EventEmitter();
  canVote = CAN_VOTE;


  constructor(
    public funcService: FunctionsService,
  ) { }

  selectPlayer(player: any) {
    // console.log(player);
    this.onSelect.emit(player);
  }

  ngOnInit(): void {
    // console.log(this.player);
  }

}
