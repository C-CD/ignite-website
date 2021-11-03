import { Injectable } from '@angular/core';
import { ToastServiceService } from '../toastServices/toast-service.service';
import * as $ from 'jquery';

@Injectable({
  providedIn: 'root'
})
export class ErrorshandlerService {

  constructor(
    private toaster: ToastServiceService
  ) { }

  reConfigureViaData(config: any, configure){
    if(configure){
      config.header = (configure.header) ? configure.header : config.header;
    }

    return config;
  }

  checkErrorHandler(error, config=null){
    let errorConfig = null;
    // error checkers
    if (error.error_description){
      errorConfig = { header:'Error', msg:error.error_description };

    }else if(error.message){
      errorConfig = { header:'Information', msg:error.message };

    }else if(error.error && error.error === 'validation_error'){
      // validation errors
      const errorMsgs = error.messages;
      this.handleInputErrors(error);
      errorConfig = { header:'Input Errors', msg: errorMsgs[Object.keys(errorMsgs)[0]] };
    }

    if(errorConfig){
      // reconfigure data if possible
      errorConfig = this.reConfigureViaData(errorConfig, config);
      this.toaster.quickToast(errorConfig);
    }
    else {
      this.toaster.globalErrorToast();
    }

  }

  handleInputErrors(errors)
  {
      // indicate wrong inputs
      if(errors.messages){
        for(const error in errors.messages){
          // console.log(error);
          if(error){
            const input = $('[formControlName=' + error + ']');
            input.removeClass('ion-valid').addClass('input-invalid');

            // $(input).change(function(e){
            //   $(input).removeClass('input-invalid');
            // });
          }
        }
      }

      setTimeout(() => {
        $('[formControlName]').removeClass('input-invalid');
      }, 4000);
  }

}
