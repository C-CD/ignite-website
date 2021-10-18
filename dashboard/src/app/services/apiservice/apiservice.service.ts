import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor() { }

  formatRequest(req: string, acs: string, post: any){
    return {
      request: req,
      access: acs,
      data: post
    };
  }
}
