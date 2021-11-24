import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-fixtures-modal',
  templateUrl: './fixtures-modal.component.html',
  styleUrls: ['./fixtures-modal.component.css']
})
export class FixturesModalComponent implements OnInit {

  @Input() fixture: any;
  youtubeEmbed!: SafeResourceUrl;

  constructor(
    public sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    // this.getSanitizedLink(this.fixture.stream);
  }

  getSanitizedLink(embedLink:string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(embedLink);
  }

}
