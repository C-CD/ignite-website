import { MylocalstorageService } from './../mylocalstorage/mylocalstorage.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class HttphelperService {

  protected token = this.myLocalStorage.get('token');

  constructor(
    private httpCall: HttpClient,
    private myLocalStorage: MylocalstorageService
  ) {
   }

  public setHeaders(modified: any = false){
    let headersInUse: any;
    const defaultHeaders = {
      // 'authorization': 'Bearer 5fd02da61210d4b9d3b46f8dd7ad025bbe45e122',
      // 'Enctype':'multipart/form-data',
      'Content-Type': 'application/json'
      // 'x-requested-with':'XMLHttpRequest'
    };

    if(modified){ headersInUse = { ...defaultHeaders, ...modified };}
    else{ headersInUse = defaultHeaders; }

    const httpOptions = {
      headers: new HttpHeaders(
        headersInUse
      )
    };

     return httpOptions;
  }

  public httpGet(addr = '', params={}, header: any=false)
  {
    const options: any = this.setHeaders(header);
    options.params = params ? params : {};

    return this.httpCall.get(addr, options);
  }

  public httpPost(addr = '', data:any, header: any=false){

    const options = this.setHeaders(header);

    return this.httpCall.post(addr, data, options);
  }

  public httpGetLocal(addr = ''): Observable<any>{
    return this.httpCall.get(addr);
  }



}
