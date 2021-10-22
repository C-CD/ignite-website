import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { take } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { FirebaseAuthService } from 'src/app/services/firebase-auth/firebase-auth.service';
import { FunctionsService } from 'src/app/services/functions/functions.service';
import { LoadingService } from 'src/app/services/loader/loading.service';
import { MediaService } from 'src/app/services/media/media.service';
import { ToastrService } from 'src/app/services/toastr/toastr.service';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formDataGroup!: FormGroup;

  constructor(
    public router: Router,
    public formBuilder: FormBuilder,
    public firebaseAuth: FirebaseAuthService,
    public loadingService: LoadingService,
    private toaster: ToastrService,
    public auth: AuthenticationService,
    private usrService: UsersService,
    private mediaService: MediaService,
    public funcService: FunctionsService,
    private titleService: Title
  ) {
    this.titleService.setTitle("Login | Administrator");
  }

  ngOnInit(): void {
    this.validateFormData();
  }

  validateFormData() {
    this.formDataGroup = this.formBuilder.group({
      email: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
        ])
      ),
      password: new FormControl(
        '',
        Validators.compose([Validators.required, Validators.minLength(8)])
      ),
    });
  }

  async loginUser(value: any) {
    // console.log(value);
    this.formDataGroup.disable();

    this.loadingService.quickLoader().then(() => {
      this.firebaseAuth
        .signInWithEmail(value.email, value.password)
        .then((usr) => {
          // store user essentials for later
          // this.auth.setCurrentUser(usr);
          console.log(usr);
          // navigate to home page for user
          this.toaster.quickToast({ msg: 'Sign-in Successful' });
          // update user last seen
          this.updateLastSeen(usr.user).then((result) => {
            this.loadingService.clearLoader();
          }).catch((error) => {
            // end execution if user is not set
            this.formDataGroup.enable();
            this.loadingService.clearLoader();
          });
        })
        .catch((error) => {
          this.formDataGroup.enable();
          this.toaster.quickToast({ msg: error.message , cat: "warning"});
          this.loadingService.clearLoader();
        });
    });
  }

  updateLastSeen(usr: any) {
    let auth: any = {};
    return new Promise((resolve, reject) => {
      this.auth.fetchAuth(usr.uid).pipe(take(1)).subscribe((authData: any) => {
        if (authData) {
          auth = authData;
        } else {
          auth.createdAt = usr.metadata.creationTime;
          auth.emailVerified = usr.emailVerified;
          auth.uid = usr.uid;
        }
        auth.lastLoggedIn = usr.metadata.lastSignInTime;
        auth.lastSeen = moment().format();
        // update auth last logged in
        this.auth.updateAuth(usr.uid, auth).then(() => {
          this.router.navigate(['']);
          resolve(true);
        }).catch((error) => {
          this.toaster.globalErrorToast();
          reject(error);
        });
      });
    });
  }

}
