import { Component, OnInit } from '@angular/core';
import { LoadingService } from 'src/app/services/loader/loading.service';

@Component({
  selector: 'app-top-loader',
  templateUrl: './top-loader.component.html',
  styleUrls: ['./top-loader.component.scss']
})
export class TopLoaderComponent implements OnInit {

  load: boolean = false;


  constructor(
    private loader: LoadingService
  ) { }

  ngOnInit(): void {
    this.loader.loadingStatus().subscribe((status: any) => {
      // console.log(status);
      this.load = status;
    })
  }


}
