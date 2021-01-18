import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from '../model/user';
import { AdminDashboardService } from '../service/admin-dashboard.service';
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

  constructor(private patientService: PatientService, private patietService: PatientService,
              private tokenService: TokenService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getProfile();
    this.getPractitioners();
  }

  getProfile(){
    this.profileData = new User();

    this.patietService.getProfileDetails(this.username)
      .subscribe(
        data => {
          this.profileData = data;
        },
        err => {
          this.toastr.error('Nem létezik a felhasználó', 'Hiba!', {
            timeOut: 3000,  positionClass: 'toast-top-center',
          });
          console.log(err)
        }

      );
  }

  getPractitioners() {
    this.patientService.getAllPractitionerExceptMe(this.username).subscribe(
      response => {
        this.practitioners = response;
      },
      err => {
        this.toastr.error('Nem létezik a felhasználó', 'Hiba!', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
        console.log(err)
      }
    );
  }

  selectedPractitioner(practitionerId: number){
    this.patietService.savePractitioner(this.username, practitionerId)
    .subscribe(data => {
      console.log(data);
    }, err => {
      this.errorMessage = err.error.message;
      this.toastr.error(this.errorMessage, 'Hiba!', {
        timeOut: 3000,  positionClass: 'toast-top-center',
      });
      console.log(err)
    }
  );
  window.location.reload();
  }
}
