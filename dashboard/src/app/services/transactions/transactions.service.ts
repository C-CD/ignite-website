import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase/app';


export interface Transactions{
  ref: string;
  narration: string;
  status: boolean;
  amount: number;
  data: any;
  uid: string;
  date: string;
}

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  constructor( private auth: AngularFireAuth, private afs: AngularFirestore) {
    this.auth.onAuthStateChanged((user) => {
      // this.usr = user;
    });
  }

  addTransactions(transaction: Transactions) {
    return this.afs.collection('transactions').doc().set(transaction);
  }

  getTransactions(id:string) {
    return this.afs.collection('transactions').doc(id).valueChanges();
  }

  getUserTransactions(id:string) {
    return firebase.firestore().collection('transactions').where('uid', '==', id).get();
  }

  deleteTransactions(id:string) {
    return this.afs.collection('transactions').doc(id).delete();
  }

}
