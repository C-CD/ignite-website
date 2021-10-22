import { ToastrService } from './../../services/toastr/toastr.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FirebaseAuthService } from 'src/app/services/firebase-auth/firebase-auth.service';
import { LoadingService } from 'src/app/services/loader/loading.service';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { UsersService } from 'src/app/services/users/users.service';
import { FunctionsService } from 'src/app/services/functions/functions.service';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  formDataGroup!: FormGroup;
  usr: any;
  users: any;

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
    this.getUsers();
    this.validateFormData();

  }

  getUsers() {
    this.usrService.getUsers().subscribe((snapshots) => {
      let users: any = [];
      // console.log(snapshot);
      snapshots.forEach((snapshot: any) => {
        // console.log(snapshot.payload.doc.data());
        const data: any = new Object();

        let doc = snapshot.payload.doc;
        data.info = doc.data();
        // fetch pso extra details
        this.authService.fetchAuth(doc.id).pipe(take(1)).subscribe((auth: any) => {
          data.auth = auth;
          data.auth.seen = (data.auth.lastLoggedIn) ?  this.funcService.timePassed(data.auth.lastLoggedIn) : null;


          users.push(data);
          console.log(users);
          this.users = users.reverse();
        });
      });
    });
  }

  validateFormData() {
    this.formDataGroup = this.formBuilder.group({
      role: new FormControl('', Validators.compose([Validators.required])),
      name: new FormControl('', Validators.compose([Validators.required])),
      email: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
        ])
      ),
      gender: new FormControl('', Validators.compose([Validators.required])),
      phone: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(11)
        ])
      ),
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



  addUser(userData: any) {
    this.formDataGroup.disable();
    this.loadingService.quickLoader().then(() => {
      // console.log(userData);
      this.checkEmailAddress(userData).then(() => {
        this.formDataGroup.enable();
        this.toaster.quickToast({ msg: 'This email address belongs to another user, Try signing in!', cat: "warning" });
        this.loadingService.clearLoader();
      }).catch((error) => {
        this.createUser(userData).then(() => {
          this.getUsers();
          this.loadingService.clearLoader();
        }).catch((error) => {
          this.formDataGroup.enable();
          this.loadingService.clearLoader();
        });
      });
    });
  }

  checkEmailAddress(data: any) {
    return new Promise((resolve, reject) => {
      this.usrService.thisCollection().where('email', '==', data.email).get().then((users) => {
        console.log(users.docs);
        if (users.docs.length) {
          resolve(true);
        } else {
          reject(true);
        }
      });
    });
  }

  createUser(data: any) {
    return new Promise((resolve, reject) => {
      this.firebaseAuth.getUser().then((currentUser) => {
        console.log(currentUser);
        const userData = data;
        // console.log(userData);

        this.firebaseAuth.signUpWithEmail(userData.email, userData.password).then((auth: any) => {
          // return user to main user
          this.firebaseAuth.fire().updateCurrentUser(currentUser).then(() => {
            // continue registering user
            console.log(auth);
            // create user information
            this.usrService.create({
              name: userData.name,
              email: userData.email,
              gender: userData.gender,
              role: userData.role,
              uid: auth.user.uid,
            }).then(() => {
              // log auth credentials
              this.authService.createAuth({
                createdAt: auth.user.metadata.creationTime,
                lastLoggedIn: auth.user.metadata.lastSignInTime,
                emailVerified: auth.user.emailVerified,
                lastSeen: moment().format(),
                uid: auth.user.uid,
              }).then(() => {
                resolve(true);
              }).catch((error) => {
                reject(error);
              });
            }).catch((error) => {
              reject(error);
            });
          });
        }).catch((error) => {
          reject(error);
        });
      });
    });
  }

}
