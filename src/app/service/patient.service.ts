import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  authURL="http://localhost:8080/api/";
  // ng build --prod
  //  authURL="https://onlinehealthcaresystem.herokuapp.com/api/";

  constructor(private httpClient: HttpClient) { }

  public getProfileDetails(username: string): Observable<User>{
    return this.httpClient.get<User>(this.authURL+'profile-details/' + username);
  }

  public updateProfile(username: string, profile: User): Observable<User>{
    return this.httpClient.put<User>(this.authURL+'profile-update/' + username, profile);
  }

  public updatePassword(username: string, password: string): Observable<User>{
    return this.httpClient.put<User>(this.authURL+'password-update/' + username, password);
  }

  public savePractitioner(username: string, practitionerId: number): Observable<User>{
    return this.httpClient.put<User>(this.authURL+'select-practitioner/' + username, practitionerId);
  }
}
