import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  load:boolean = false;

  constructor(

  ) { }

  loadingStatus(){
    return new Observable((observer) => {
      setInterval(() => {
        observer.next(this.load);
      }, 1000);
    })
  }

  async quickLoader(config:any = false){
    this.load = true;

    // this.loader = await this.loadingControl.create({
    //     cssClass: (data.class) ? data.class:'loading-custom shadow-12dp',
    //     mode: 'ios',
    //     message: (data.msg) ? data.msg:'Processing...',
    //     duration: (data.duration) ? data.duration : false
    //   });

    //   await this.loader.present();
  }

  clearLoader(){
    this.load = false;
    // this.loader.dismiss();
  }

}
