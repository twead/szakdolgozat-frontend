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

  public getAllPatient(): Observable<Array<User>>{
    return this.httpClient.get<Array<User>>(this.dashboardURL+'patients');
  }

  public getPatientById(id: number): Observable<User>{
    return this.httpClient.get<User>(this.dashboardURL+'patients/details/' + id);
  }

  public updatePatient(id: number, practitioner: User): Observable<User>{
    return this.httpClient.put<User>(this.dashboardURL+'patients/update/' + id, practitioner);
  }

  public upgradeToPractitioner(id: number){
    return this.httpClient.get(this.dashboardURL+'patients/upgrade-to-practitioner/' + id);
  }

  public downgradeToPatient(id: number){
    return this.httpClient.get(this.dashboardURL+'practitioner/downgrade-to-patient/' + id);
  }

  public deletePatient(id: number){
    return this.httpClient.delete(this.dashboardURL + 'patients/delete/' + id);
  }

  public getAllPractitioner(): Observable<Array<User>>{
    return this.httpClient.get<Array<User>>(this.dashboardURL+'practitioners');
  }

}
