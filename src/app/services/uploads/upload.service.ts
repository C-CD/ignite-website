import { Injectable } from '@angular/core';
import {
  AngularFireStorage,
  AngularFireUploadTask,
} from '@angular/fire/storage';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { finalize, tap, take } from 'rxjs/operators';
import { NgxImageCompressService } from 'ngx-image-compress';

export interface ImgFile {
  name: string;
  filepath: string;
  size: number;
}

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  // File upload task
  fileUploadTask!: AngularFireUploadTask;
  // Upload progress
  percentageVal!: Observable<number>;
  // Track file uploading with snapshot
  trackSnapshot!: Observable<any>;
  // Uploaded File URL
  uploadedImageURL!: Observable<string>;
  // Uploaded image collection
  files: Observable<ImgFile[]>;
  // Image specifications
  imgName!: string;
  imgSize!: number;
  // File uploading status
  isFileUploading: boolean;
  isFileUploaded: boolean;

  private filesCollection: AngularFirestoreCollection<ImgFile>;

  constructor(
    private afs: AngularFirestore,
    private afStorage: AngularFireStorage,
    private imageCompress: NgxImageCompressService
  ) {
    this.isFileUploading = false;
    this.isFileUploaded = false;

    // Define uploaded files collection
    this.filesCollection = afs.collection<ImgFile>('imagesCollection');
    this.files = this.filesCollection.valueChanges();
  }

  uploadImage(event: FileList) {
    const file: any = event.item(0);

    // Image validation
    if (file.type.split('/')[0] !== 'image') {
      console.log('File type is not supported!');
      return;
    }

    this.isFileUploading = true;
    this.isFileUploaded = false;

    this.imgName = file.name;

    // Storage path
    const fileStoragePath = `filesStorage/${new Date().getTime()}_${file.name}`;

    // Image reference
    const imageRef = this.afStorage.ref(fileStoragePath);

    // File upload task
    this.fileUploadTask = this.afStorage.upload(fileStoragePath, file);

    // Show uploading progress
    this.percentageVal != this.fileUploadTask.percentageChanges();
    this.trackSnapshot = this.fileUploadTask.snapshotChanges().pipe(
      finalize(() => {
        // Retreive uploaded image storage path
        this.uploadedImageURL = imageRef.getDownloadURL();
        this.uploadedImageURL.subscribe(
          (resp) => {
            this.storeFilesFirebase({
              name: file.name,
              filepath: resp,
              size: this.imgSize,
            });
            this.isFileUploading = false;
            this.isFileUploaded = true;
          },
          (error) => {
            console.log(error);
          }
        );
      }),
      tap((snap: any) => {
        this.imgSize = snap.totalBytes;
      })
    );
  }

  startFileUpload(event: any, dir = 'imageStorage', index = 0, slug = 'image', isFile = false) {
    return new Promise((resolve, reject) => {
      const file: any = (isFile) ? event : event.item(index);
      // Image validation
      // if (file.type.split('/')[0] !== 'image') {
      //   console.log('File type is not supported!');
      //   return;
      // }
      // console.log(file);
      this.imgName = file.name;
      const time = new Date().getTime();
      const ext = file.name.split('.').pop();
      // Storage path
      const fileStoragePath = `${dir}/${time}_${slug}.${ext}`;
      // Image reference
      const imageRef = this.afStorage.ref(fileStoragePath);
      // File upload task
      this.fileUploadTask = this.afStorage.upload(fileStoragePath, file);
      // console.log(this.fileUploadTask);

      this.fileUploadTask.then((data) => {
        this.uploadedImageURL = imageRef.getDownloadURL();
        // console.log(this.uploadedImageURL);
        this.uploadedImageURL.pipe(take(1)).subscribe(
          (resp) => {
            // console.log(resp);
            resolve({
              name: file.name,
              filepath: resp,
              size: this.imgSize,
            });
          },
          (error) => {
            console.log(error);
            reject(error);
          }
        );
      });
    });
  }

  storeFilesFirebase(image: ImgFile) {
    const fileId = this.afs.createId();

    this.filesCollection
      .doc(fileId)
      .set(image)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

}
