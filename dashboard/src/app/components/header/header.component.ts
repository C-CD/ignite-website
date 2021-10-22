import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { FirebaseAuthService } from 'src/app/services/firebase-auth/firebase-auth.service';
import { FunctionsService } from 'src/app/services/functions/functions.service';
import { LoadingService } from 'src/app/services/loader/loading.service';
import { ToastrService } from 'src/app/services/toastr/toastr.service';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  usr: any;

  constructor(
    public router: Router,
    public firebaseAuth: FirebaseAuthService,
    public loadingService: LoadingService,
    public authService: AuthenticationService,
    private usrService: UsersService,
    public funcService: FunctionsService,
    private toaster: ToastrService,
  ) {
    this.firebaseAuth.getUserState().subscribe((authUser: any) => {
      this.usrService.getFullDetails(authUser).then((data) => {
        this.usr = data;
        // get psos once user is known
      });
    });
  }

  ngOnInit(): void {
  }

  async logUserOut() {
    this.loadingService.quickLoader().then(() => {
      if (confirm('You are about to logout your current account, any un-finished data will not be saved.')) {
        this.firebaseAuth
          .signOut()
          .then(() => {
            this.router.navigate(['/login']);
            this.toaster.quickToast({ msg: 'Sign-out Successful' });
            this.loadingService.clearLoader();
          })
          .catch((error) => {
            console.log(error);
            // show error
            this.toaster.quickToast({ msg: 'Error Signing-out ...' });
            this.loadingService.clearLoader();
          });
      } else {
        this.toaster.quickToast({ msg: 'Sign-out Cancelled!' });
        this.loadingService.clearLoader();
      }
    });
  }

}
