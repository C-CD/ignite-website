import { MediaService } from './../media/media.service';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase/app';
import { take } from 'rxjs/operators';
import { AuthenticationService } from '../authentication/authentication.service';
import { FunctionsService } from '../functions/functions.service';
import { sum } from 'lodash';
import { FirebaseAuthService } from '../firebase-auth/firebase-auth.service';


export class User {
  name!: string;
  email!: string;
  gender!: string;
  role!: string;
  uid!: string;
}

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  collection:any;
  usr:any;

  constructor(
    private ngFirestore: AngularFirestore,
    private mediaService: MediaService,
    private authService: AuthenticationService,
    private funcService: FunctionsService,
    private firebaseAuth: FirebaseAuthService,
  ) {
    this.firebaseAuth.getUserState().subscribe((authUser) => {
      this.getFullDetails(authUser).then((data) => {
        this.usr = data;
      });
    });
  }

  thisCollection() {
    return firebase.firestore().collection('user');
  }

  getFullDetails(user:any) {
    return new Promise((resolve, reject) => {
      const data: any = {};
      if(user){
        this.getUser(user.uid).subscribe((usr: any) => {
          data.info = usr;
          // get auth data
          this.authService
            .fetchAuth(user.uid)
            .pipe(take(1))
            .subscribe((auth) => {
              data.auth = auth;
              data.auth.lastSeen = ((data.auth.lastSeen) ? data.auth.lastSeen: data.auth.lastLoggedIn);
              data.auth.seen = this.funcService.timePassed(((data.auth.lastSeen) ? data.auth.lastSeen: data.auth.lastLoggedIn));
              // update user last seen only if user is current login user
              this.firebaseAuth.getUserState().subscribe((authUser:any) => {
                if(authUser.uid === user.uid){
                  this.authService.updateLastSeen(data.auth);
                }
              });
              // get media data
              this.mediaService
                .getMedia(user.uid)
                .pipe(take(1))
                .subscribe((media: any) => {
                  data.media = media;
                    // get bio of user
                    // return full data
                    resolve(data);
                });
            });
        });
      }else{
        reject(false);
      }
    });
  }

  create(user: User) {
    return this.ngFirestore.collection('user').doc(user.uid).set(user);
  }

  getUsers() {
    return this.ngFirestore.collection('user').snapshotChanges();
  }

  getUser(id:string) {
    return this.ngFirestore.collection('user').doc(id).valueChanges();
  }

  update(id:string, user: User) {
    return this.ngFirestore.collection('user').doc(id).update(user);
  }
}
