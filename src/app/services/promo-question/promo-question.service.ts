import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase/app';

export interface Answer {
  question: string;
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  content: string;
  created: string;
  updated: string;
}

@Injectable({
  providedIn: 'root'
})
export class PromoQuestionService{
  constructor(
    private auth: AngularFireAuth,
    private afs: AngularFirestore
  ) {
    this.auth.onAuthStateChanged((user) => {
      // this.usr = user;
    });
  }

  collection(){
    return firebase.firestore().collection('answers');
  }

  setAnswer(answer: Answer, id: string | undefined = undefined) {
    return this.afs.collection('answers').doc(id).set(answer);
  }
  
  addAnswer(answer: Answer){
    return this.afs.collection('answers').doc().set(answer);
  }

  getAnswer(id: string) {
    return this.afs.collection('answers').doc(id).valueChanges();
  }

  getAnswers() {
    return firebase.firestore().collection('answers').get();
  }

  deleteAnswer(id: string) {
    return this.afs.collection('answers').doc(id).delete();
  }
}
