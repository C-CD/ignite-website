import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Angular4PaystackModule } from 'angular4-paystack';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    Angular4PaystackModule.forRoot('pk_test_xxxxxxxxxxxxxxxxxxxxxxxx'),

  ]
})
export class PaystackPayModule { }
