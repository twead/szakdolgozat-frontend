import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class AdminDashboardService {

  authURL="http://localhost:8080/api/dashboard/";
  // ng build --prod
  //  authURL="https://onlinehealthcaresystem.herokuapp.com/api/";

  constructor(private httpClient: HttpClient) { }

  public getAllPatients(): Observable<Array<User>>{
    return this.httpClient.get<Array<User>>(this.authURL+'patients');
  }

  public getAllPractitioner(): Observable<Array<User>>{
    return this.httpClient.get<Array<User>>(this.authURL+'practitioners');
  }

  public getPractionerById(id: number): Observable<User>{
    return this.httpClient.get<User>(this.authURL+'details/' + id);
  }

  public updatePractitioner(id: number, practitioner: User): Observable<User>{
    return this.httpClient.put<User>(this.authURL+'update/' + id, practitioner);
  }

  public deletePractitioner(id: number){
    return this.httpClient.delete(this.authURL + 'delete/' + id);
  }

}
