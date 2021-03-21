import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/model/user';
import { Worktime } from 'src/app/model/worktime';
import { AppointmentService } from 'src/app/service/appointment.service';
import { PatientService } from 'src/app/service/patient.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-worktime',
  templateUrl: './worktime.component.html',
  styleUrls: ['./worktime.component.css']
})
export class WorktimeComponent implements OnInit {

  username: string = this.tokenService.getUserName();
  profileData: User;
  errorMessage: string;

  worksOnHolidays: boolean;

  mondayStart: string;
  tuesdayStart: string;
  wednesdayStart: string;
  thursdayStart: string;
  fridayStart: string;

  mondayEnd: string;
  tuesdayEnd: string;
  wednesdayEnd: string;
  thursdayEnd: string;
  fridayEnd: string;

  datas: Worktime[];

  constructor( private toastr: ToastrService, private tokenService: TokenService,
    private patientService: PatientService) { }

  ngOnInit(): void {
    this.getProfile();
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

  onSubmit() {
    this.getProfile();
  }
}
