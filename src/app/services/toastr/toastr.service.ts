import { CustomNotificationComponent } from './../../components/custom-notification/custom-notification.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Injectable } from '@angular/core';
import * as $ from "jquery";

@Injectable({
  providedIn: 'root'
})
export class ToastrService {

  constructor(
    readonly snackBar: MatSnackBar
  ) { }

  quickToast(config: any, ) {
    this.snackBar.openFromComponent(
      CustomNotificationComponent,
      {
        horizontalPosition: 'right',
        verticalPosition: 'top',
        panelClass: 'custom-snack',
        duration: (config.timeout ? config.timeout : 5000),
        data: {
          alert: (config.cat ? config.cat : "info"),
          msg: (config.msg ? config.msg : "An error occurred contact administrator.")
        }
      }
    );
  }

  globalErrorToast() {
    this.quickToast({
      msg: 'Oops! an error occurred check your internet and try again.',
      cat: 'danger'
    });
  }
}
