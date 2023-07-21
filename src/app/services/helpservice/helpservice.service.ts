import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase/app';
import { set } from 'lodash';

export interface HelpDesk {
  tid: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  category: string;
  message: string;
  status: string;
  created: string;
  updated: string;
}

@Injectable({
  providedIn: 'root'
})
export class HelpserviceService {
  constructor(
    private auth: AngularFireAuth,
    private afs: AngularFirestore
  ) {
    this.auth.onAuthStateChanged((user) => {
      // this.usr = user;
    });
  }

    collection(){
      return firebase.firestore().collection('helpdesk');
    }

    setHelp(helpdesk: HelpDesk, id: string | undefined = undefined) {
      return this.afs.collection('helpdesk').doc(id).set(helpdesk);
    }
    
}
 
