import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/apiservice/apiservice.service';
import { FunctionsService } from 'src/app/services/functions/functions.service';
import { HttphelperService } from 'src/app/services/httphelper/httphelper.service';
import { environment } from 'src/environments/environment';

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
    private funcService: FunctionsService,
    private httpHelper: HttphelperService,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.validateFormData();
  }

  validateFormData() {
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
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
        ])
      ),
    });
  }

  sendMail(data: any) {
    const postData = this.apiService.formatRequest(
      'mailing', 'contact-us', data
    );
      this.httpHelper.httpPost(this.env.api, postData).subscribe((response) => {
        console.log(response);
        // if (response.error){

        // }
      }, (error) => {
        console.log(error);
      });
  }

}
