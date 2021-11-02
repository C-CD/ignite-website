import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

export class Media {
  avatar!: string;
  images: any = null;
  videos: any = null;
  audios: any = null;
  uid!: string;
}
@Injectable({
  providedIn: 'root'
})
export class MediaService {

  constructor(
    private auth: AngularFireAuth, 
    private afs: AngularFirestore
  ) { }

  getMedias() {
    return this.afs.collection('media').snapshotChanges();
  }

  getMedia(id:string) {
    return this.afs.collection('media').doc(id).valueChanges();
  }

  setMedia(media: Media, id: string | undefined = undefined) {
    return this.afs.collection('media').doc(id).update(media);
  }

  deleteMedia(id:string) {
    return this.afs.collection('media').doc(id).delete();
  }

}
