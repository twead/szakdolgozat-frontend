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

  slotMinTime: string;
  slotMaxTime: string;
  defaultTimePerClient :number;
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
          this.getBusinessHours();
          this.getWorksOnHolidays();
        },
        err => {
          this.toastr.error('Nem létezik a felhasználó', 'Hiba!', {
            timeOut: 3000,  positionClass: 'toast-top-center',
          });
        }
      );
  }

  getBusinessHours(){
    this.appointmentService.getBusinessHours(this.username)
    .subscribe(
      data => {
          this.mondayStart = data[0].fromTime;
          this.mondayEnd = data[0].toTime;
          this.tuesdayStart = data[1].fromTime;
          this.tuesdayEnd = data[1].toTime;
          this.wednesdayStart = data[2].fromTime;
          this.wednesdayEnd = data[2].toTime;
          this.thursdayStart = data[3].fromTime;
          this.thursdayEnd = data[3].toTime;
          this.fridayStart = data[4].fromTime;
          this.fridayEnd = data[4].toTime;
      },
      error => {

      }
    );
  }

  getWorksOnHolidays(){
    this.appointmentService.getHolidayWorksForWorktimeSettings(this.username)
    .subscribe(
      data => {
        this.defaultTimePerClient = data.defaultTimePerClient;
        this.slotMinTime = data.slotMinTime;
        this.slotMaxTime = data.slotMaxTime;
        this.worksOnHoliday = data.worksOnHoliday;
      },
      error => {

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

      this.appointmentService.setWorksOnHolidays(this.username,
        new HolidaysDto(
          this.slotMinTime?this.slotMinTime:'06:00',
          this.slotMaxTime?this.slotMaxTime:'20:00',
          this.defaultTimePerClient?this.defaultTimePerClient:30,
          this.worksOnHoliday)).subscribe(
        data => {
        },
        error => {

        }
      );
  }

}
