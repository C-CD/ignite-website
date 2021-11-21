import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase/app';


export interface Coaches {
  team: string | null;
  name: string;
  gender: string;
  position: string;
  state: string;
  qualifications: string;
  years: string;
  achieved: string;
  updated: string;
  created: string;
}


@Injectable({
  providedIn: 'root'
})
export class CoachesService {

  constructor(private auth: AngularFireAuth, private afs: AngularFirestore) {
    this.auth.onAuthStateChanged((user) => {
      // this.usr = user;
    });
  }

  collection() {
    return firebase.firestore().collection('coaches');
  }

  setCoach(coaches: Coaches, id: string | undefined = undefined) {
    return this.afs.collection('coaches').doc(id).set(coaches);
  }

  getCoach(id: string) {
    return this.afs.collection('coaches').doc(id).valueChanges();
  }

  getCoaches() {
    return firebase.firestore().collection('coaches').get();
  }

  deleteCoach(id: string) {
    return this.afs.collection('coaches').doc(id).delete();
  }

}
