import { Component, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi } from '@fullcalendar/angular';
import { EventInput } from '@fullcalendar/core'
import huLocale from '@fullcalendar/core/locales/hu';
import { ToastrService } from 'ngx-toastr';
import { InstructionDto } from '../dto/instruction-dto';
import { ModalComponent } from '../modal/modal.component';
import { Appointment } from '../model/appointment';
import { User } from '../model/user';
import { AppointmentService } from '../service/appointment.service';
import { UserProfileService } from '../service/user-profile.service';
import { TokenService } from '../service/token.service';
import { createEventId, HOLIDAYS } from './event-utils';
import { stringify } from '@angular/compiler/src/util';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppointmentComponent {

  username: string = this.tokenService.getUserName();
  profileData: User;
  errorMessage: string;
  dayNumber: number = null;
  calendarEvents: EventInput[] = [];
  customBusinessHours: EventInput[] = [];
  myCalendarEventForInstruction?: InstructionDto[] = [];
  wantToWorkOnHolidays: boolean;

  constructor(private service : AppointmentService, private toastr: ToastrService,
    private tokenService: TokenService, private userProfileService: UserProfileService,
    public matDialog: MatDialog){ }

  ngOnInit(){
    var day = new Date();
    this.dayNumber = day.getDay();
    this.calendarOptions.firstDay = this.dayNumber;
    this.getProfile();
  }

  calendarVisible = true;
  calendarOptions: CalendarOptions = {
    locale: huLocale,
    allDaySlot: false,
    headerToolbar: {
      left: 'prev,next',
      center: 'title',
      right: 'today'
    },
    forceEventDuration: true,
    slotLabelFormat: {
      hour: 'numeric',
      minute: '2-digit',
      omitZeroMinute: false,
      meridiem: 'short'
    },

    slotDuration:'00:30',
    defaultTimedEventDuration:'00:30',
    slotLabelInterval: 30,
    slotMinTime: '2:00',
    slotMaxTime: '20:00',

    businessHours: [],
    selectConstraint:[],

    longPressDelay: 0,

    validRange: {
      start: Date.now(),
      end: Date.now() + 1000*60*60*24*31
    },
    events: this.calendarEvents,
    initialView: 'timeGridWeek',
    firstDay: this.dayNumber,
    weekends: false,
    editable: false,
    selectable: true,
    selectMirror: false,
    dayMaxEvents: true,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this),

    /* you can update a remote database when these fire:
    eventAdd:
    eventChange:
    eventRemove:
    */
  };

  currentEvents: EventApi[] = [];

  getProfile(){

    this.profileData = new User();

    this.userProfileService.getProfileDetails(this.username)
      .subscribe(
        data => {
          this.profileData = data;
          this.doesYourDoctorWorkOnHolidays();
        },
        err => {
          this.toastr.error('Nem létezik a felhasználó', 'Hiba!', {
            timeOut: 3000,  positionClass: 'toast-top-center',
          });
        }

      );
  }

  doesYourDoctorWorkOnHolidays(){
    this.service.getWorksOnHolidays(this.username).subscribe(
      data => {
        this.calendarOptions.slotDuration = '00:' + data.defaultTimePerClient,
        this.calendarOptions.slotLabelInterval = data.defaultTimePerClient,
        this.calendarOptions.defaultTimedEventDuration = '00:' + data.defaultTimePerClient;
        this.calendarOptions.slotMinTime = data.slotMinTime,
        this.calendarOptions.slotMaxTime = data.slotMaxTime,
        this.wantToWorkOnHolidays = data.worksOnHoliday;
        this.getYourDoctorBusinessHours();
      },
      error => {

      }
    )
  }

  getYourDoctorBusinessHours(){
    this.service.myPractitionerWorkingTime(this.username).subscribe(
      data => {
        data.forEach(element => {
          this.customBusinessHours = this.customBusinessHours.concat({
            daysOfWeek: [element.day],
            startTime: element.fromTime,
            endTime: element.toTime,
            },)
        })
        this.calendarOptions.businessHours = this.customBusinessHours;
        this.calendarOptions.selectConstraint = this.customBusinessHours;
        this.showMyReservations();
      })
  }

  showMyReservations(){
    this.service.getAppointments(this.username).subscribe(
      data => {
        data.forEach(element => {
          this.calendarEvents = this.calendarEvents.concat({
              id: ''+element.id,
              title: element.message,
              start:element.time
            },)
            this.showAppointmentsForInstruction();
        })
        this.calendarOptions.events = this.calendarEvents;
        this.getOthersReservations();
      })
  }

  showAppointmentsForInstruction(){
    this.service.showAppointmentsForInstruction(this.username).subscribe(
      data => {
        this.myCalendarEventForInstruction = data;
      },
      error => {
      }
    );
  }

  getOthersReservations(){
    this.service.getOthersAppointments(this.username).subscribe(
       data => {

         data.forEach(element => {

           this.calendarEvents = this.calendarEvents.concat({
               id: ''+element.id,
               start: element.time,
               backgroundColor: '#dddddd',
               textColor: '#000000',
               borderColor: '#dddddd',
               color: '#dddddd',
               className: 'disabled'
             },);
         })


        if(this.wantToWorkOnHolidays == true)
         HOLIDAYS.forEach(element => {
          this.calendarEvents = this.calendarEvents.concat({
            id: createEventId()+1111,
            start: element.start,
            end: element.end,
            backgroundColor: '#dddddd',
            textColor: '#000000',
            borderColor: '#dddddd',
            color: '#dddddd',
            className: 'disabled'
          })
        })
        this.calendarOptions.events = this.calendarEvents;

       })
     }

  handleDateSelect(selectInfo: DateSelectArg) {
    const calendarApi = selectInfo.view.calendar;
    calendarApi.unselect();
    var minute;
    selectInfo.start.getMinutes()!=0?minute=selectInfo.start.getMinutes():minute=selectInfo.start.getMinutes()+"0"

    const dialogRef = this.matDialog.open(ModalComponent, {
      width: '500px',
      data:{
        title: "Biztosan foglalsz?",
        paragraph: selectInfo.start.getFullYear()+'.'+
                  selectInfo.start.getMonth()+'.'+
                  selectInfo.start.getDay()+'. '+
                  selectInfo.start.getHours()+':'+
                  minute,
    }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result == true){

        const dialogRef = this.matDialog.open(ModalComponent, {
          width: '500px',
          data:{
            title: "Ha szeretnéd, írd le a problémádat pár szóban",
        }
        });

      //const title = prompt('Ha szeretnéd, írd le a problémádat pár szóban');
      dialogRef.afterClosed().subscribe(result => {
        if(result!=true){
            calendarApi.addEvent({
            id: createEventId()+'f',
            title: result,
            start: selectInfo.startStr
          });
        }
        else {
          calendarApi.addEvent({
            id: createEventId()+'f',
            title: this.profileData.patient.name,
            start: selectInfo.startStr
          });
        }

        this.service.saveAppointment(this.username, new Appointment(null,result!=true?result:this.profileData.patient.name,selectInfo.startStr)).subscribe(
          data => {
            this.toastr.success('Sikeres időpontfoglalás!', 'OK', {
              timeOut: 3000,  positionClass: 'toast-top-center',
            });
            window.location.reload();
          },
          err => {
            this.errorMessage = err.error.message;
            this.toastr.error(this.errorMessage, 'Hiba!', {
              timeOut: 3000,  positionClass: 'toast-top-center',
            });
            window.location.reload();
          }
        );
      });
      }
    });
  }

  handleEventClick(clickInfo: EventClickArg) {
    if(clickInfo.event.backgroundColor != '#dddddd'){

      var minute;
      clickInfo.event.start.getMinutes()!=0?minute=clickInfo.event.start.getMinutes():minute=clickInfo.event.start.getMinutes()+"0"

      const dialogRef = this.matDialog.open(ModalComponent, {
        width: '250px',
        data:{title: "Biztosan törlöd?",
        paragraph: clickInfo.event.start.getFullYear()+'.'+
                   clickInfo.event.start.getMonth()+'.'+
                   clickInfo.event.start.getDay()+'. '+
                   clickInfo.event.start.getHours()+':'+
                   minute
      }
      });

      dialogRef.afterClosed().subscribe(result => {
        if(result == true){
          this.service.deleteAppointment(clickInfo.event.id).subscribe(
            data => {
              this.toastr.success('Sikeresen törölted az időpontot!', 'OK', {
                timeOut: 3000,  positionClass: 'toast-top-center',
              });
            },
            err => {
              this.toastr.error('Az időpont törlése nem sikerült!', 'Hiba!', {
                timeOut: 3000,  positionClass: 'toast-top-center',
              });
            }
          );
          clickInfo.event.remove();
        }
      });
    }
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
  }

}
