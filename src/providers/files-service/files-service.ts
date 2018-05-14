import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
/*
  Generated class for the FileServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FilesService {
  url: string = 'http://50.18.222.96:8080/';
  // url: string = 'http://192.168.31.129:8080/';

  constructor(
    public httpClient: HttpClient,
    private transfer: FileTransfer
  ) { }

  getImage(imageName): Observable<Blob> {
    return this.httpClient.get(this.url + '/api/files/image?filename=' + imageName, {
      responseType: 'blob'
    });
  }

  uploadFile(url: string, file: File) {
    const formData = new FormData();

    formData.append('file', file);

    return this.httpClient.post(this.url + url, formData);
  }

  uploadImage(img) {

    // Destination URL
    let url = this.url + '/api/files';

    // File for Upload
    var targetPath = img;

    var options: FileUploadOptions = {
      fileKey: 'file',
      chunkedMode: false,
      mimeType: 'multipart/form-data',
      // params: { 'desc': desc }
    };

    const fileTransfer: FileTransferObject = this.transfer.create();

    // Use the FileTransfer to upload the image
    return fileTransfer.upload(targetPath, url, options);
  }

}
