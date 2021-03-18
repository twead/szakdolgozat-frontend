import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Appointment } from '../model/appointment';
import { User } from '../model/user';
import { Worktime } from '../model/worktime';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  appointmentURL = environment.appointmentURL;

  constructor(private httpClient: HttpClient) { }

  public getAllPractitionerExceptMe(name: string): Observable<Array<User>>{
    return this.httpClient.get<Array<User>>(this.appointmentURL+'schedule-practitioners/' + name);
  }

  public updatePractitioner(username: string, practitionerId: number){
    return this.httpClient.put(this.appointmentURL+'update-practitioner/' + username, practitionerId);
  }

  public saveAppointment(username: string, appointment: Appointment){
    return this.httpClient.post(this.appointmentURL+'create/'+username, appointment);
  }

  public getAppointments(username: string): Observable<Array<Appointment>>{
    return this.httpClient.get<Array<Appointment>>(this.appointmentURL+'show/'+ username);
  }

  public getBusinessHours(username: string): Observable<Array<Appointment>>{
    return this.httpClient.get<Array<Appointment>>(this.appointmentURL+'show-business-hours/' + username);
  }

  public deleteAppointment(id: string){
    return this.httpClient.delete(this.appointmentURL+'delete/'+ id);
  }

}
