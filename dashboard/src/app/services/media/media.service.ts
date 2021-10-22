import { Injectable } from '@angular/core';
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
    private ngFirestore: AngularFirestore,
    private router: Router
  ) { }

  create(media: Media) {
    return this.ngFirestore.collection('media').doc(media.uid).set(media);
  }

  getMedias() {
    return this.ngFirestore.collection('media').snapshotChanges();
  }

  getMedia(id:string) {
    return this.ngFirestore.collection('media').doc(id).valueChanges();
  }

  updateMedia(id:string, media: Media) {
    return this.ngFirestore.collection('media').doc(id).update(media);
  }

  deleteMedia(id:string) {
    return this.ngFirestore.collection('media').doc(id).delete();
  }

}
