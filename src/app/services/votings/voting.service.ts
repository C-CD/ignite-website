import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase/app';

export interface Votes {
  ref: string;
  player: string;
  amount: number;
  quantity: number;
  points: number;
  meta_data: any;
  date: string;
}
@Injectable({
  providedIn: 'root'
})
export class VotingService {

  constructor(private auth: AngularFireAuth, private afs: AngularFirestore) {
    this.auth.onAuthStateChanged((user) => {
      // this.usr = user;
    });
  }

  collection() {
    return firebase.firestore().collection('votes');
  }

  addVote(vote: Votes) {
    return this.afs.collection('votes').doc().set(vote);
  }

  updateVote(id: string, vote: Votes) {
    return this.afs.collection('votes').doc(id).set(vote);
  }

  getVote(id: string) {
    return this.afs.collection('votes').doc(id).valueChanges();
  }

  getVotes() {
    return firebase.firestore().collection('votes').get();
  }

  deleteVote(id: string) {
    return this.afs.collection('votes').doc(id).delete();
  }
}
