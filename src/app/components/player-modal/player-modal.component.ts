import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-player-modal',
  templateUrl: './player-modal.component.html',
  styleUrls: ['./player-modal.component.css']
})
export class PlayerModalComponent implements OnInit {

  @Input() player: any;

  constructor() {

   }

  ngOnInit(): void {

  }

}
