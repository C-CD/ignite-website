import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase/app';


export interface PayResolution {
  meta: any;
  status: number;
  updated: string;
  created: string;
}

@Injectable({
  providedIn: 'root'
})
export class PayResolutionService {

  constructor(private auth: AngularFireAuth, private afs: AngularFirestore) {
    this.auth.onAuthStateChanged((user) => {
      // this.usr = user;
    });
  }

  collection() {
    return firebase.firestore().collection('payRes');
  }

  addPayResolution(pay: PayResolution) {
    return this.afs.collection('payRes').doc().set(pay);
  }

  updatePayResolution(id: string, pay: PayResolution) {
    return this.afs.collection('payRes').doc(id).set(pay);
  }

  getPayResolution(id: string) {
    return this.afs.collection('payRes').doc(id).valueChanges();
  }

  getPayResolutions() {
    return firebase.firestore().collection('payRes').get();
  }

  deletePayResolution(id: string) {
    return this.afs.collection('payRes').doc(id).delete();
  }
}
