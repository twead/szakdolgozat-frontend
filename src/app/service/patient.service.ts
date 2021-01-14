import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  patientURL = environment.patientURL;

  constructor(private httpClient: HttpClient) { }

  public getProfileDetails(username: string): Observable<User>{
    return this.httpClient.get<User>(this.patientURL+'profile-details/' + username);
  }

  public updateProfile(username: string, profile: User): Observable<User>{
    return this.httpClient.put<User>(this.patientURL+'profile-update/' + username, profile);
  }

  public updatePassword(username: string, password: string): Observable<User>{
    return this.httpClient.put<User>(this.patientURL+'password-update/' + username, password);
  }

  public savePractitioner(username: string, practitionerId: number): Observable<User>{
    return this.httpClient.put<User>(this.patientURL+'select-practitioner/' + username, practitionerId);
  }
}
