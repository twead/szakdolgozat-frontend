import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  patientURL = environment.patientURL;

  constructor(private https: HttpClient) { }

  pushFileToStorageMine(username: string, file: File): Observable<HttpEvent<{}>> {
    const data: FormData = new FormData();
    data.append('file', file);
    const newRequest = new HttpRequest('POST', this.patientURL + 'uploadFile/' + username, data, {
        reportProgress: true,
        responseType: 'text'
    });
    return this.https.request(newRequest);
  }

  deleteFileFromStorage(username: string, filename: String): Observable<HttpEvent<{}>> {
        const newRequest = new HttpRequest('POST', this.patientURL + 'deleteFile/' + username, filename, {
            responseType: 'text'
        });
        return this.https.request(newRequest);
  }

}
