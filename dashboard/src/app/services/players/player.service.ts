import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase/app';


export interface Players {
  name: string;
  gender: string;
  year: string;
  updated: string;
  created: string;
}

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  constructor(private auth: AngularFireAuth, private afs: AngularFirestore) {
    this.auth.onAuthStateChanged((user) => {
      // this.usr = user;
    });
  }

  collection() {
    return firebase.firestore().collection('players');
  }

  addPlayer(players: Players) {
    return this.afs.collection('players').doc().set(players);
  }

  getPlayer(id: string) {
    return this.afs.collection('players').doc(id).valueChanges();
  }

  getPlayers() {
    return firebase.firestore().collection('players').get();
  }

  deletePlayer(id: string) {
    return this.afs.collection('players').doc(id).delete();
  }
}
