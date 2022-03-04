import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import * as $ from 'jquery';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  curUrl:string = '';



  constructor(
    private router: Router
  ) {
    router.events.subscribe((val) => {
      this.curUrl = this.router.url
      console.log(this.router.url);
    });

  }

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

  isCurPage(page: string) {
    return (this.curUrl === page);
  }
}
