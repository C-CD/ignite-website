import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase/app';

export interface HighlightsData {
  hid: string;
  highlight_title: string;
  highlight_url: string;
  highlight_date: string;
  updated: string;
  created: string;
}


@Injectable({
  providedIn: 'root'
})
export class HighlightsService {

  constructor(private auth: AngularFireAuth, private afs: AngularFirestore) {
    this.auth.onAuthStateChanged((user) => {
      // this.usr = user;
    });
  }

  collection(){
    return firebase.firestore().collection('teams');
  }

  getHighlight(id: string) {
    return this.afs.collection('highlights').doc(id).valueChanges();
  }

  getHighlights() {
    return firebase.firestore().collection('highlights').get();
  }
}
