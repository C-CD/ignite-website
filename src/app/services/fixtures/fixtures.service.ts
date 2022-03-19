import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase/app';


export interface Fixtures {
  id: string;
  home: string;
  away: string;
  scores: null | {
    home: number;
    away: number
  };
  match_day: string;
  match_time: string;
  match_end_time: string;
  status: string;
  stream: string;
  updated: string;
  created: string;
}

@Injectable({
  providedIn: 'root'
})
export class FixturesService {

  constructor(private auth: AngularFireAuth, private afs: AngularFirestore) {
    this.auth.onAuthStateChanged((user) => {
      // this.usr = user;
    });
  }

  collection(){
    return firebase.firestore().collection('fixtures');
  }

  addFixtures(Fixtures: Fixtures) {
    return this.afs.collection('fixtures').doc().set(Fixtures);
  }

  updateFixture(id: string, Fixtures: Fixtures) {
    return this.afs.collection('fixtures').doc(id).update(Fixtures);
  }

  getFixture(id: string) {
    return this.afs.collection('fixtures').doc(id).valueChanges();
  }

  getFixtures() {
    return firebase.firestore().collection('fixtures').get();
  }

  deleteFixture(id: string) {
    return this.afs.collection('fixtures').doc(id).delete();
  }

}

