import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuccessModalComponent } from './success-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserModule } from '@angular/platform-browser';



@NgModule({
  declarations: [
    SuccessModalComponent
  ],
  exports: [
    SuccessModalComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatSnackBarModule,
    BrowserModule,
  ]
})
export class SuccessModalModule { }
