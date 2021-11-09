import { ApiService } from './../apiservice/apiservice.service';
/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { HttphelperService } from '../httphelper/httphelper.service';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})

export class FlutterwaveService {
  env = environment;
  // flutterwave key
  publicKey = 'FLWPUBK-1a2a5e3c6a2dfb316ba3ccb1c3c9795d-X';
  secretKey = 'FLWSECK_TEST-1103ae7e8e97b319576ff948e718c048-X';

  constructor(
    private httpHelper: HttphelperService,
    private apiService: ApiService
  ) { }


  createPayment(data: any){
    const postData = this.apiService.formatRequest(
      'payments', 'create-pay-url',
      {
        tx_ref: 'coin-purchase-' + this.generateReference(),
        amount: data.amount,
        currency: 'NGN',
        redirect_url: '',
        payment_options: 'card, transfer',
        customer:{
          email: data.email,
          phonenumber: '080****4528',
          name: data.name
        },
        customizations:{
          title: 'Urge2k Coin Purchase',
          description: 'Purchase urgecoins',
          logo: 'https://assets.piedpiper.com/logo.png'
        }
    });

    // console.log(postData);
    return new Promise((resolve, reject) => {
      this.httpHelper.httpPost(this.env.api, postData, {
          Authorization: `Bearer ${this.secretKey}`
        }).subscribe((response) => {
          console.log(response);
          resolve(response);
        }, (error) => {
          console.log(error);
          reject(error);
        });
    });
  }

  verifyTransaction(data:any){
    const postData = this.apiService.formatRequest(
      'payments', 'verify-payment', data
    );
    return new Promise((resolve, reject) => {
      this.httpHelper.httpPost(this.env.api, postData).subscribe((response) => {
          console.log(response);
          resolve(response);
        }, (error) => {
          console.log(error);
          reject(error);
        });
    });
  }

  makePaymentCallback(response:any): void {
    console.log('Payment callback', response);
  }

  closedPaymentModal(): void {
    console.log('payment is closed');
  }

  generateReference(): string {
    const date = new Date();
    return date.getTime().toString();
  }

}
