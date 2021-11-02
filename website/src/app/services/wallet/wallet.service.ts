import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

export interface Wallet{
  balance: number;
  uid: string;
}
@Injectable({
  providedIn: 'root'
})

export class WalletService {

  constructor( private auth: AngularFireAuth, private afs: AngularFirestore) {
    this.auth.onAuthStateChanged((user) => {
      // this.usr = user;
    });
  }

  addWallet(wallet: Wallet, usr: string) {
    return this.afs.collection('wallets').doc(usr).set(wallet);
  }

  getWallet(id:string) {
    return this.afs.collection('wallets').doc(id).valueChanges();
  }

  deleteWallet(id:string) {
    return this.afs.collection('wallets').doc(id).delete();
  }

}
