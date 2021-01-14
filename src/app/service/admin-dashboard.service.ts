import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class AdminDashboardService {

  dashboardURL = environment.dashboardURL;

  constructor(private httpClient: HttpClient) { }

  public getAllPatients(): Observable<Array<User>>{
    return this.httpClient.get<Array<User>>(this.dashboardURL+'patients');
  }

  public getAllPractitioner(): Observable<Array<User>>{
    return this.httpClient.get<Array<User>>(this.dashboardURL+'practitioners');
  }

  public getAllPractitionerExceptMe(name: string): Observable<Array<User>>{
    return this.httpClient.get<Array<User>>(this.dashboardURL+'schedule-practitioners/' + name);
  }

  public getPractionerById(id: number): Observable<User>{
    return this.httpClient.get<User>(this.dashboardURL+'details/' + id);
  }

  public updatePractitioner(id: number, practitioner: User): Observable<User>{
    return this.httpClient.put<User>(this.dashboardURL+'update/' + id, practitioner);
  }

  public deletePractitioner(id: number){
    return this.httpClient.delete(this.dashboardURL + 'delete/' + id);
  }

}
