import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/apiservice/apiservice.service';
import { FunctionsService } from 'src/app/services/functions/functions.service';
import { HttphelperService } from 'src/app/services/httphelper/httphelper.service';
import { environment } from 'src/environments/environment';
import { HelpserviceService } from 'src/app/services/helpservice/helpservice.service';
import { LoadingService } from 'src/app/services/loader/loading.service';
import {ToastrService} from 'src/app/services/toastr/toastr.service';
import * as moment from 'moment';
type Response = {
  status: boolean;
  message: string;
}
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  formDataGroup!: FormGroup;
  env = environment;
  response: Response|null = null;

  constructor(
    public formBuilder: FormBuilder,
    public loadingService: LoadingService,
    private funcService: FunctionsService,
    private httpHelper: HttphelperService,
    private apiService: ApiService,
    private helpService: HelpserviceService,
    private toaster: ToastrService,
  ) { }

  ngOnInit(): void {
    this.validateFormData();
  }

  validateFormData() {
    let tid = this.funcService.generateRandomString(6);
    let status = 'pending';
    this.formDataGroup = this.formBuilder.group({
      message: new FormControl(
        '', Validators.compose([Validators.required])
      ),
      firstName: new FormControl('', Validators.compose([Validators.required])
      ),
      lastName: new FormControl('', Validators.compose([Validators.required])
      ),
      phone: new FormControl(
        '', Validators.compose([Validators.required,])
      ),
      email: new FormControl(
        '',Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
        ])
      ),
      category: new FormControl('', Validators.compose([Validators.required])),
      tid: new FormControl(tid),
      status: new FormControl(status),
    });
  }

  sendMail(data: any) {
    console.log(this.formDataGroup.value)
    const postData = this.apiService.formatRequest(
      'mailing', 'contact-us', data
    );
      this.httpHelper.httpPost(this.env.api, postData).subscribe((response) => {
        
        // if (response.error){

        // }
      }, (error) => {
        console.log(error);
      });
  }


  
  submitHelp(formData: any){
    console.log(formData)
    this.loadingService.quickLoader().then(()=>{
      this.helpService.setHelp({
        tid: formData.tid,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        category: formData.category,
        message: formData.message,
        status: formData.status,
        created: moment().format(),
        updated: moment().format(),
      }).then((response)=>{
        console.log(response)
        this.loadingService.clearLoader();
        this.toaster.quickToast({msg:'Your message has been sent successfully. We will get back to you shortly.', cat:'success'})
        this.response = {
          status: true,
          message: 'Your message has been sent successfully. We will get back to you shortly.'
        }
        this.formDataGroup.reset()
      }).catch((error)=>{
        console.log(error)
      })
    })
  }
}
