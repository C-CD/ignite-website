import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { FirebaseAuthService } from 'src/app/services/firebase-auth/firebase-auth.service';
import { FunctionsService } from 'src/app/services/functions/functions.service';
import { LoadingService } from 'src/app/services/loader/loading.service';
import { ToastrService } from 'src/app/services/toastr/toastr.service';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.scss']
})
export class SetupComponent implements OnInit {

  formDataGroup!: FormGroup;
  usr: any;

  constructor(
    public router: Router,
    public formBuilder: FormBuilder,
    public firebaseAuth: FirebaseAuthService,
    public loadingService: LoadingService,
    private toaster: ToastrService,
    public authService: AuthenticationService,
    private usrService: UsersService,
    public funcService: FunctionsService,
  ) { }

  ngOnInit(): void {
    this.validateFormData();
  }

  validateFormData() {
    this.formDataGroup = this.formBuilder.group({
      password: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(8)
        ])
      ),
      confirm: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(8)
        ])
      )
    });
  }

  setupAccount(usrData:any){

  }

}
