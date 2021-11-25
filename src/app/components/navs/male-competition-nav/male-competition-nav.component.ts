import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-male-competition-nav',
  templateUrl: './male-competition-nav.component.html',
  styleUrls: ['./male-competition-nav.component.css']
})
export class MaleCompetitionNavComponent implements OnInit {

  @Input() page!: string;

  constructor() { }

  ngOnInit(): void {
  }

  isCurPage(nPage:string){
    return (this.page === nPage);
  }

}
