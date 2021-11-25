import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-female-competition-nav',
  templateUrl: './female-competition-nav.component.html',
  styleUrls: ['./female-competition-nav.component.css']
})
export class FemaleCompetitionNavComponent implements OnInit {

  @Input() page!: string;

  constructor() { }

  ngOnInit(): void {
  }

  isCurPage(nPage: string) {
    return (this.page === nPage);
  }

}
