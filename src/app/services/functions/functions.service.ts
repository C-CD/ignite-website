import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
// import * as $ from 'jquery';
import * as moment from 'moment';
import { FormGroup } from '@angular/forms';
@Injectable({
  providedIn: 'root',
})
export class FunctionsService {
  env = environment;

  constructor() {}

  toggleOtherinfo(element:string, target:string) {
    const emmt = $(element);
    console.log(emmt);
    $(emmt).find(target).toggleClass('show');
  }

  chooseImg(hot:any) {
    const img =
      hot.imgs.length > 0
        ? 'images/' + this.randomData(hot.imgs)
        : 'profile/' + hot.img;
    // return this.env.upload_dir + img;
    // await setTimeout(() => {
    //   return this.env.upload_dir + img;
    // }, 2000);
  }

  randomData(data:any) {
    return data[Math.floor(Math.random() * data.length)];
  }

  truncateString(str:string, num:number) {
    if (str.length <= num) {
      return str + '.';
    }
    return str.slice(0, num) + '...';
  }

  range(start:number, end:any, step = 1) {
    const foo = new Array(end);
    const values = [];
    for (let i = start; i < foo.length; i = i + step) {
      values.push(i);
    }

    return values;
  }

  timePassed(date:string) {
    return moment(date).fromNow();
  }

  timeDiff(start:string, end:string, result = 'seconds') {
    moment(start).diff(end);
  }

  shuffleArray(list:any) {
    return list.sort(() => Math.random() - 0.5);
  }

  timeConvert(timeSeconds:any) {
    const secNum = parseInt(timeSeconds, 10); // don't forget the second param
    let hours: any   = Math.floor(secNum / 3600);
    let minutes: any = Math.floor((secNum - (hours * 3600)) / 60);
    let seconds: any = secNum - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = `0${hours}`;}
    if (minutes < 10) {minutes = `0${minutes}`;}
    if (seconds < 10) {seconds = `0${seconds}`;}
    // return formatted date
    return `${hours}:${minutes}:${seconds}`;
  }

  generateRandomString(length = 5){
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() *
        charactersLength));
    }
    return result;;
  }

  resetReactiveForm(form: FormGroup) {
    form.reset();

    Object.keys(form.controls).forEach((key) => {
      form.get(key)!.setErrors(null);
    });
  }

  handleSnapshot(snapshots:any){
    if (snapshots && snapshots.size) {
      let result = snapshots.docs.map((snapshot: any) => {
        let data = snapshot.data();
        data.snap_id = snapshot.id;

        return data;
      });

      return result;
    }else{
      return null;
    }
  }
}
