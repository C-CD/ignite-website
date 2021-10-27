import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthService {

  constructor(public angularFire: AngularFireAuth) { }

  getUser(){
    return this.angularFire.currentUser;
  }
  getUserState(){
    return this.angularFire.authState;
  }

  signInWithEmail(email: string, password: string): Promise<firebase.auth.UserCredential> {
    return this.angularFire.signInWithEmailAndPassword(email, password);
  }

  signUpWithEmail(email: string, password: string): Promise<firebase.auth.UserCredential> {
    return this.angularFire.createUserWithEmailAndPassword(email, password);
  }

  signOut(): Promise<void> {
    return this.angularFire.signOut();
  }

}
