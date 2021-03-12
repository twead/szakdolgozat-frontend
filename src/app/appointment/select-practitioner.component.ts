import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { User } from '../model/user';
import { AppointmentService } from '../service/appointment.service';
import { PatientService } from '../service/patient.service';
import { TokenService } from '../service/token.service';

@Component({
  selector: 'app-select-practitioner',
  templateUrl: './select-practitioner.component.html',
  styleUrls: ['./select-practitioner.component.css']
})
export class SelectPractitionerComponent implements OnInit {

  username: string = this.tokenService.getUserName();
  profileData: User;

  practitioners: Array<User> = [];
  errorMessage: string;

  constructor(private appointmentService: AppointmentService, private patientService: PatientService,
              private tokenService: TokenService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getProfile();
    this.getPractitioners();
  }

  getProfile(){
    this.profileData = new User();

    this.patientService.getProfileDetails(this.username)
      .subscribe(
        data => {
          this.profileData = data;
        },
        err => {
          this.toastr.error('Nem létezik a felhasználó', 'Hiba!', {
            timeOut: 3000,  positionClass: 'toast-top-center',
          });
        }

      );
  }

  getPractitioners() {
    this.appointmentService.getAllPractitionerExceptMe(this.username).subscribe(
      response => {
        this.practitioners = response;
      },
      err => {
        this.toastr.error('Nem létezik a felhasználó', 'Hiba!', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
      }
    );
  }

  selectedPractitioner(practitionerId: number){
    this.appointmentService.savePractitioner(this.username, practitionerId)
    .subscribe(data => {
      this.toastr.success('Háziorvosod kiválasztottad!', 'OK', {
        timeOut: 3000,  positionClass: 'toast-top-center',
      });
    }, err => {
      this.errorMessage = err.error.message;
      this.toastr.error(this.errorMessage, 'Hiba!', {
        timeOut: 3000,  positionClass: 'toast-top-center',
      });
    }
  );
  window.location.reload();
  }
}
