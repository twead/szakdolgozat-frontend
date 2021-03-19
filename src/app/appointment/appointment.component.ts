import { getLocaleFirstDayOfWeek } from '@angular/common';
import { ChangeDetectorRef, Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi } from '@fullcalendar/angular';
import { EventInput } from '@fullcalendar/core'
import huLocale from '@fullcalendar/core/locales/hu';
import { ToastrService } from 'ngx-toastr';
import { Appointment } from '../model/appointment';
import { User } from '../model/user';
import { AppointmentService } from '../service/appointment.service';
import { PatientService } from '../service/patient.service';
import { TokenService } from '../service/token.service';
import { createEventId } from './event-utils';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppointmentComponent {

  username: string = this.tokenService.getUserName();
  profileData: User;
  calendarEvents: EventInput[] = [];
  toSave: Appointment;
  errorMessage: string;
  dayNumber: number = null;
  //validEndDate: Date = new Date;

//  dayNumber : number = this.dayIndo.view.calendar.getDate().getDay();

  constructor(private service : AppointmentService, private toastr: ToastrService,
    private tokenService: TokenService, private patientService: PatientService){ }

  ngOnInit(){
    var day = new Date();
    this.dayNumber = day.getDay();
    this.calendarOptions.firstDay = this.dayNumber;
    /*var now = new Date();
    this.validEndDate.setFullYear(now.getFullYear() + 1);
    */
    this.getProfile();
    this.getOthersReservations();
    this.showMyReservations();
  }

  calendarVisible = true;
  calendarOptions: CalendarOptions = {
    locale: huLocale,
    headerToolbar: {
      left: 'prev,next',
      center: 'title',
      right: 'today'
    },
    forceEventDuration: true,
    slotDuration: '00:15',
    slotLabelInterval: 15,
    slotLabelFormat: {
      hour: 'numeric',
      minute: '2-digit',
      omitZeroMinute: false,
      meridiem: 'short'
    },
    slotMinTime: '6:00',
    slotMaxTime: '20:00',

    businessHours: [ // specify an array instead
      {
        daysOfWeek: [1,2,3], // Monday, Tuesday, Wednesday
        startTime: '08:00', // 8am
        endTime: '18:00' // 6pm
      },
      {
        daysOfWeek: [ 4, 5 ], // Thursday, Friday
        startTime: '10:00', // 10am
        endTime: '16:00', // 4pm
      },
    ],

    /*selectConstraint: {
      start: Date.now(),
      end: '2021-03-23',
    },*/

    validRange: {
      start: Date.now(),
      end: Date.now() + 1000*60*60*24*365
      //end: new Date('2022-03-23'),
    },

    events: this.calendarEvents,
    initialView: 'timeGridWeek',
    firstDay: this.dayNumber,
    weekends: false,
    editable: false,
    defaultTimedEventDuration:'00:15',
    selectable: true,
    selectMirror: true,
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

  showMyReservations(){
    this.service.getAppointments(this.username).subscribe(
      data => {
        data.forEach(element => {
          this.calendarEvents = this.calendarEvents.concat({
              id: ''+element.id,
              title: element.message,
              start:element.time
            },)
        })
        this.calendarOptions.events = this.calendarEvents;
      })
  }

  getOthersReservations(){
    this.service.getBusinessHours(this.username).subscribe(
       data => {

         data.forEach(element => {

           this.calendarEvents = this.calendarEvents.concat({
               id: ''+element.id,
               start: element.time,
               backgroundColor: '#dddddd',
               textColor: '#dddddd',
               borderColor: '#dddddd',
               color: '#dddddd',
               className: 'disabled'
             },);
         })
         this.calendarOptions.events = this.calendarEvents;
       })
     }

  handleDateSelect(selectInfo: DateSelectArg) {
    const calendarApi = selectInfo.view.calendar;
    calendarApi.unselect(); // clear date selection

    /*if ((Date.now() - selectInfo.start.getTime()) >= 0)
      return false;*/

    if(confirm("Biztosan foglalsz?")){
    const title = prompt('Ha szeretnéd, írd le a problémádat pár szóban');
    if (title) {
        calendarApi.addEvent({
        id: createEventId()+'f',
        title,
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
                //selectInfo.start.getDay();
      this.service.saveAppointment(this.username, new Appointment(null,title?title:this.profileData.patient.name,selectInfo.startStr)).subscribe(
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
      )
    }
  }

  handleEventClick(clickInfo: EventClickArg) {
    if(clickInfo.event.backgroundColor != '#dddddd'){
    if (confirm(`Biztosan törölöd a foglalásod? '${clickInfo.event.start}'`)) {
      this.service.deleteAppointment(clickInfo.event.id).subscribe(
        data => {
          this.toastr.success('Sikeres törölted az időpontot!', 'OK', {
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
  }
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
  }

}
