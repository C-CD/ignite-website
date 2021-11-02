import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase/app';


export interface Players {
  team: string|null;
  fname: string;
  lname: string;
  gender: string;
  age: number;
  address: string;
  state: string;
  local_gov: string;
  school: string;
  s_address: string;
  s_class: string;
  sport: string;
  position: string;
  bootsize: number;
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

  setPlayer(players: Players, id: string|undefined = undefined) {
    return this.afs.collection('players').doc(id).set(players);
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
