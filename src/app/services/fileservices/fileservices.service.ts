import { NgxImageCompressService } from 'ngx-image-compress';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FileservicesService {
  constructor(private imageCompress: NgxImageCompressService) {}

  readSingleBlob(event: any) {
    const imageFile = event.target.files[0];
    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
      console.log(reader.result);
      return reader.result as string;
    };
    // reader.readAsDataURL(imageFile);
  }

  readSingleImage(event: any) {
    return new Promise((resolve, reject) => {
      if (event.target.files.length){
        const imageFile = event.target.files[0];
        // File Preview
        const reader = new FileReader();
        reader.onload = () => {
          // console.log(reader.result);
          resolve(reader.result as string);
        };
        reader.readAsDataURL(imageFile);
      }else{
        reject("No File Selected");
      }
    });
  }

  startCompress(file: any, filename: string) {
    const reader = new FileReader();
    reader.onload = (event: any) => {
      const localUrl = event.target.result;
      this.compressFile(localUrl, filename);
    };
    // reader.readAsDataURL(event.target.files[0]);
  }

  compressFile(image: any, fileName: string) {
    return new Promise((resolve) => {
      const orientation = -1;
      const sizeOfOriginalImage =
        this.imageCompress.byteCount(image) / (1024 * 1024);
      console.warn('Size in bytes is now:', sizeOfOriginalImage);
      this.imageCompress
        .compressFile(image, orientation, 50, 50)
        .then((result) => {
          const imgResultAfterCompress = result;
          const localCompressedURl = result;
          const sizeOFCompressedImage =
            this.imageCompress.byteCount(result) / (1024 * 1024);
          console.warn(
            'Size in bytes after compression:',
            sizeOFCompressedImage
          );
          // create file from byte
          const imageName = fileName;
          // call method that creates a blob from dataUri
          const imageBlob = this.dataURItoBlob(
            imgResultAfterCompress.split(',')[1]
          );
          //imageFile created below is the new compressed file which can be send to API in form data
          const imageFile = new File([result], imageName, {
            type: 'image/jpeg',
          });
          resolve(imageFile);
        });
    });
  }

  dataURItoBlob(dataURI: any) {
    const byteString = window.atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], { type: 'image/jpeg' });
    return blob;
  }

  base64toBlob(base64Data: any, contentType: any) {
    contentType = contentType || '';
    const sliceSize = 1024;
    const byteCharacters = atob(decodeURIComponent(base64Data));
    const bytesLength = byteCharacters.length;
    const slicesCount = Math.ceil(bytesLength / sliceSize);
    const byteArrays = new Array(slicesCount);

    for (let sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
      const begin = sliceIndex * sliceSize;
      const end = Math.min(begin + sliceSize, bytesLength);

      const bytes = new Array(end - begin);
      for (let offset = begin, i = 0; offset < end; ++i, ++offset) {
        bytes[i] = byteCharacters[offset].charCodeAt(0);
      }
      byteArrays[sliceIndex] = new Uint8Array(bytes);
    }
    return new Blob(byteArrays, { type: contentType });
  }

  b64toBlob(b64Data: any, contentType: any, sliceSize: any) {
    contentType = contentType || '';
    sliceSize = sliceSize || 512;

    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);

      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }

  convertBase64ToBlob(base64Image: string) {
    // Split into two parts
    const parts = base64Image.split(';base64,');
    // Hold the content type
    const imageType = parts[0].split(':')[1];
    // Decode Base64 string
    const decodedData = window.atob(parts[1]);
    // Create UNIT8ARRAY of size same as row data length
    const uInt8Array = new Uint8Array(decodedData.length);
    // Insert all character code into uInt8Array
    for (let i = 0; i < decodedData.length; ++i) {
      uInt8Array[i] = decodedData.charCodeAt(i);
    }
    // Return BLOB image after conversion
    return new Blob([uInt8Array], { type: imageType });
  }

  public blobToFile = (theBlob: Blob, fileName: string): File => {
    var b: any = theBlob;
    //A Blob() is almost a File() - it's just missing the two properties below which we will add
    b.lastModifiedDate = new Date();
    b.name = fileName;

    //Cast to a File() type
    return <File>theBlob;
  }

  createFileList = (file:any) => {
    const fileList = new FileList();
    fileList[0] = file;
    fileList.item = index => fileList[index]; // override method functionality
    return fileList;
  }
}
