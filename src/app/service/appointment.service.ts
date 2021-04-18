import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HolidaysDto } from '../dto/holidays-dto';
import { InstructionDto } from '../dto/instruction-dto';
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

  public showAppointmentsForInstruction(username: string): Observable<Array<InstructionDto>>{
    return this.httpClient.get<Array<InstructionDto>>(this.appointmentURL+'show-appointments-for-instruction/'+ username);
  }

  public getOthersAppointments(username: string): Observable<Array<Appointment>>{
    return this.httpClient.get<Array<Appointment>>(this.appointmentURL+'show-others-appointments/' + username);
  }

  public deleteAppointment(id: string){
    return this.httpClient.delete(this.appointmentURL+'delete/'+ id);
  }

  public setBusinessHours(username: string, worktimes: Worktime[]){
    return this.httpClient.put(this.appointmentURL+'set-business-hours/' + username, worktimes);
  }

  public getBusinessHours(username: string){
    return this.httpClient.get<Array<Worktime>>(this.appointmentURL+'get-business-hours/' + username);
  }

  public myPractitionerWorkingTime(username: string){
    return this.httpClient.get<Array<Worktime>>(this.appointmentURL+'my-practitioner-working-time/' + username);
  }

  public setWorksOnHolidays(username: string, worksOnHoliday: HolidaysDto){
    return this.httpClient.post(this.appointmentURL+'works-on-holidays/' + username, worksOnHoliday);
  }

  public getHolidayWorksForWorktimeSettings(username: string){
    return this.httpClient.get<HolidaysDto>(this.appointmentURL+'works-on-holidays/'+ username);
  }

  public getWorksOnHolidays(username: string){
    return this.httpClient.get<HolidaysDto>(this.appointmentURL+'my-practitioner-works-on-holidays/'+ username);
  }

}
