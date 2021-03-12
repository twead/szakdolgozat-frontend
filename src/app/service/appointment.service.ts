import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  appointmentURL = environment.appointmentURL;

  constructor(private httpClient: HttpClient) { }

  public getAllPractitionerExceptMe(name: string): Observable<Array<User>>{
    return this.httpClient.get<Array<User>>(this.appointmentURL+'schedule-practitioners/' + name);
  }

  public savePractitioner(username: string, practitionerId: number){
    return this.httpClient.put(this.appointmentURL+'select-practitioner/' + username, practitionerId);
  }
}
