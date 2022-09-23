import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxFormValidationsModule } from 'ngx-form-validations';
import { PlayerRegisterationComponent } from './player-registeration.component';
import { SuccessModalModule } from '../success-modal/success-modal.module';
import { StatusModalsComponent } from './status-modals/status-modals.component';



@NgModule({
  declarations: [
    PlayerRegisterationComponent,
    StatusModalsComponent
  ],
  exports: [
    PlayerRegisterationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    FormsModule,
    NgxFormValidationsModule,
    SuccessModalModule
  ]
})
export class PlayerRegisterationModule { }
