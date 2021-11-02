import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    $(function() {
      //Preloader
      var preloaderFadeOutTime = 500;
      function hidePreloader() {
      var preloader = $('.preloader-wrapper');
      preloader.fadeOut(preloaderFadeOutTime);
      }
      hidePreloader();
    })

  }


}
