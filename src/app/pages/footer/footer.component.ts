import { Component, OnInit } from '@angular/core';
import { faWhatsapp, faInstagram, faTwitter, faFacebook, faYoutube } from '@fortawesome/free-brands-svg-icons';
import * as $ from 'jquery';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  faWhatsapp = faWhatsapp;
  faInstagram = faInstagram;
  faTwitter = faTwitter;
  faFacebook = faFacebook;
  faYoutube = faYoutube;

  constructor() { }

  ngOnInit(): void {
    $(function() { 
      //Whatsapp Chat Activation
      $("div.whatsAppChatContent").hide();
      $(".chat").on("click", function(e) {
        e.preventDefault();
        $("div.whatsAppChatContent").slideToggle();        
      });
    });
  }

}
