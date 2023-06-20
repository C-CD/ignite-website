import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase/app';

export interface Teams {
  index?: number;
  ref: string;
  name: string;
  gender: string;
  year: string;
  updated: string;
  created: string;
}

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  constructor(private auth: AngularFireAuth, private afs: AngularFirestore) {
    this.auth.onAuthStateChanged((user) => {
      // this.usr = user;
    });
  }

  collection() {
    return firebase.firestore().collection('teams');
  }

  addTeams(teams: Teams) {
    return this.afs.collection('teams').doc().set(teams);
  }

  updateTeam(id: string, teams: Teams) {
    return this.afs.collection('teams').doc(id).set(teams);
  }

  getTeam(id: string) {
    return this.afs.collection('teams').doc(id).valueChanges();
  }

  getTeams() {
    return firebase.firestore().collection('teams').get();
  }

  deleteTeam(id: string) {
    return this.afs.collection('teams').doc(id).delete();
  }
}
