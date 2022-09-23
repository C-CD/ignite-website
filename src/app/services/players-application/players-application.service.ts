import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase/app';

export interface PlayersRegistration {
  surname: string;
  first_name: string;
  middle_name: string;
  dob: string;
  gender: string;
  state_of_origin: string;
  home_address: string;
  state: string;
  lga: string;
  city: string;
  edu_level: string;
  school_name: string;
  school_cert_file: string;
  school_address: string;
  sport_interested: string;
  sport_position: string;
  health_challenge: string;
  health_challenge_desc: string;
  current_play: string;
  current_team: string;
  guardian_surname: string;
  guardian_fname: string;
  guardian_relationship: string;
  guardian_address: string;
  guardian_email: string;
  guardian_phone: string;
  identification_type: string;
  identification_number: string;
  identification_file: string;
  consent_terms: boolean|0|1;
  consent_guardian: boolean | 0 | 1;
  consent_ccd: boolean | 0 | 1;
  year: string;
  updated: string;
  created: string;
}

@Injectable({
  providedIn: 'root'
})
export class PlayersApplicationService {

  constructor(private afs: AngularFirestore) { }

  collection() {
    return firebase.firestore().collection('players_registrations');
  }

  addPlayersRegistration(players_registration: PlayersRegistration) {
    return this.afs.collection('players_registrations').doc().set(players_registration);
  }

  updatePlayersRegistration(id: string, players_registration: PlayersRegistration) {
    return this.afs.collection('players_registrations').doc(id).set(players_registration);
  }

  getPlayersRegistration(id: string) {
    return this.afs.collection('players_registrations').doc(id).valueChanges();
  }

  getPlayersRegistrations() {
    return firebase.firestore().collection('players_registrations').get();
  }

  deletePlayersRegistration(id: string) {
    return this.afs.collection('players_registrations').doc(id).delete();
  }
}
