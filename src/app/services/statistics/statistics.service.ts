import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase/app';

export interface StatsPlayer {
  id: string;
  goals: number;
  saves: number;
  assists: number;
  shots: number;
  conceded: number;
  yellow_card: number;
  red_card: number;
  games: number;
  sheets: number;
  eviction: string;
  injuries: boolean;
  player: string;
  date: string;
}

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  constructor(private auth: AngularFireAuth, private afs: AngularFirestore) {

  }

  PlayerStats() {
    return firebase.firestore().collection('playerStats');
  }

  setPlayerStats(id: string, player: StatsPlayer) {
    return this.afs.collection('playerStats').doc(id).set(player);
  }

  getPlayerStats(id: string) {
    return this.afs.collection('playerStats').doc(id).valueChanges();
  }

  getStats() {
    return firebase.firestore().collection('playerStats').get();
  }

  deletePlayerStats(id: string) {
    return this.afs.collection('playerStats').doc(id).delete();
  }
}
