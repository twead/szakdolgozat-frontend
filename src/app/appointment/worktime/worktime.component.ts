import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { HolidaysDto } from 'src/app/dto/holidays-dto';
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

  worksOnHoliday: boolean;

  mondayStart: string = "";
  tuesdayStart: string= "";
  wednesdayStart: string= "";
  thursdayStart: string= "";
  fridayStart: string= "";

  mondayEnd: string = "";
  tuesdayEnd: string = "";
  wednesdayEnd: string = "";
  thursdayEnd: string = "";
  fridayEnd: string = "";

  worktime: Worktime;
  worktimes: Array<Worktime>;

  constructor( private toastr: ToastrService, private tokenService: TokenService,
    private appointmentService : AppointmentService, private patientService: PatientService) { }

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
    this.appointmentService.setBusinessHours(
      this.username,
      this.worktimes = [
      new Worktime(1,1,this.mondayStart,this.mondayEnd),
      new Worktime(2,2,this.tuesdayStart,this.tuesdayEnd),
      new Worktime(3,3,this.wednesdayStart,this.wednesdayEnd),
      new Worktime(4,4,this.thursdayStart,this.thursdayEnd),
      new Worktime(5,5,this.fridayStart,this.fridayEnd),
    ])
      .subscribe(
        data => {
          this.toastr.success('Munkaidőd beállításra került!', 'OK', {
            timeOut: 3000,  positionClass: 'toast-top-center',
          });
        },
        error => {

        }
      );

      this.appointmentService.setWorksOnHolidays(this.username, new HolidaysDto(this.worksOnHoliday)).subscribe(
        data => {
        },
        error => {

        }
      );
  }

}
