import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-coach-modal',
  templateUrl: './coach-modal.component.html',
  styleUrls: ['./coach-modal.component.css']
})
export class CoachModalComponent implements OnInit {

  @Input() coach: any;


  constructor() { }

  ngOnInit(): void {
  }

}
