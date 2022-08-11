import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase/app';

export interface Standing {
  team: { id: string, text: string };
  name: string;
  played: number;
  won: number;
  draw: number;
  lost: number;
  goals_for: number;
  goals_against: number;
  goal_diff: number;
  points: number;
  year: string;
  updated: string;
  created: string;
}

@Injectable({
  providedIn: 'root'
})
export class StandingsService {

  constructor(private afs: AngularFirestore) { }

  collection() {
    return firebase.firestore().collection('standings');
  }

  addStanding(standing: Standing) {
    return this.afs.collection('standings').doc().set(standing);
  }

  updateStanding(id: string, standing: Standing) {
    return this.afs.collection('standings').doc(id).set(standing);
  }

  getStanding(id: string) {
    return this.afs.collection('standings').doc(id).valueChanges();
  }

  getStandings() {
    return firebase.firestore().collection('standings').get();
  }

  deleteStanding(id: string) {
    return this.afs.collection('standings').doc(id).delete();
  }
}
