import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class AdminDashboardService {

  authURL="http://localhost:8080/api/";
  // ng build --prod
  //  authURL="https://onlinehealthcaresystem.herokuapp.com/api/";

  constructor(private httpClient: HttpClient) { }

  public getAllPatients(): Observable<Array<User>>{
    return this.httpClient.get<Array<User>>(this.authURL+'patients');
  }

  public getAllPractitioner(): Observable<Array<User>>{
    return this.httpClient.get<Array<User>>(this.authURL+'practitioners');
  }



}
