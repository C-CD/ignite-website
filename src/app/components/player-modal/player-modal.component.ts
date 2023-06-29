import { Component, Input, OnInit } from '@angular/core';
import { ClipboardService } from 'ngx-clipboard';
import { Clipboard } from '@angular/cdk/clipboard';

@Component({
  selector: 'app-player-modal',
  templateUrl: './player-modal.component.html',
  styleUrls: ['./player-modal.component.css'],
})
export class PlayerModalComponent implements OnInit {
  @Input() player: any;

  location = window.location;

  constructor(
    private clipboard: Clipboard,
    private _clipboardService: ClipboardService
  ) {}

  ngOnInit(): void {
    // console.log(this.player)
  }

  copyToClipboard(item: string) {
    document.addEventListener('copy', (e: ClipboardEvent) => {
      if (e.clipboardData) e.clipboardData.setData('text/plain', item);
      e.preventDefault();
      // @ts-ignore
      document.removeEventListener('copy', null);
    });
    document.execCommand('copy');
    alert('Copied player link to clipboard');
  }
}
