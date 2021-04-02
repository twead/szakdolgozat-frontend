import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ClientCrudDto } from '../dto/client-crud-dto';

@Injectable({
  providedIn: 'root'
})
export class PractitionerDashboardService {

  dashboardURL = environment.practitionerDashboardURL;

  constructor(private httpClient: HttpClient) { }

  public getAllClient(practitionerUsername: string): Observable<Array<ClientCrudDto>>{
    return this.httpClient.get<Array<ClientCrudDto>>(this.dashboardURL+'show-my-clients/'+practitionerUsername);
  }

  /*
  public updatePatient(id: number, practitioner: User): Observable<User>{
    return this.httpClient.put<User>(this.dashboardURL+'patients/update/' + id, practitioner);
  }
  */

  public deleteAppointment(id: number){
    return this.httpClient.delete(this.dashboardURL + 'clients/delete-appointment/' + id);
  }


}
