import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase/app';
import { Players } from '../players/player.service';
import { Teams } from '../team/team.service';


type PlayersList = { id: string | number, text: string, data?: string };
export type Scorers = { player: string, team: string, time: string, player_data?: Players, team_data?: Teams };
export type Substitutions = { player: string, team: string, status: 'evicted' | 'in-game' | 'on-going', player_data?: Players, team_data?: Teams };

export interface Fixtures {
  id: string;
  home: string;
  away: string;
  scorers: Scorers[]
  substitutions: Substitutions[]
  scores: null | {
    home: number;
    away: number;
    // home_scorers: PlayersList[];
    // away_scorers: PlayersList[];
  };
  // home_subs: PlayersList[];
  // away_subs: PlayersList[];
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

  collection() {
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

