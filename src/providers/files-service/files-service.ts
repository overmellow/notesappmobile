import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
/*
  Generated class for the FileServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FilesService {
  url: string = 'http://192.168.31.129:8080/';

  constructor(public httpClient: HttpClient) { }

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

}
