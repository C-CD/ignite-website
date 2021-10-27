import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { MylocalstorageService } from '../mylocalstorage/mylocalstorage.service';

export class Auth {
  createdAt!:string;
  lastLoggedIn!: string;
  lastSeen!: string;
  emailVerified!: boolean;
  uid!: string;
}
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(
    public router: Router,
    private mylocalStorage: MylocalstorageService,
    private ngFirestore: AngularFirestore,
  ) {}

  setCurrentUser(data: any) {
    console.log(data);
  }

  logoutUser() {
    this.router.navigate(['/login']);
  }

  createAuth(auth: Auth) {
    return this.ngFirestore.collection('auth').doc(auth.uid).set(auth);
  }

  fetchAuths(){
    return this.ngFirestore.collection('auth').snapshotChanges();
  }

  fetchAuth(id:string) {
    return this.ngFirestore.collection('auth').doc(id).valueChanges();
  }

  updateAuth(id:string, auth: Auth) {
    return this.ngFirestore.collection('auth').doc(id).update(auth);
  }

  updateLastSeen(auth:any){
    auth.lastSeen = moment().format();
        // update auth last logged in
    return this.updateAuth(auth.uid, auth);
  }
}
