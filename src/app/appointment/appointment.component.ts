import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi } from '@fullcalendar/angular';
import { EventInput } from '@fullcalendar/core'
import huLocale from '@fullcalendar/core/locales/hu';
import { ToastrService } from 'ngx-toastr';
import { Appointment } from '../model/appointment';
import { User } from '../model/user';
import { Worktime } from '../model/worktime';
import { AppointmentService } from '../service/appointment.service';
import { PatientService } from '../service/patient.service';
import { TokenService } from '../service/token.service';
import { createEventId } from './event-utils';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent {

  username: string = this.tokenService.getUserName();
  calendarEvents: EventInput[] = [];
  toSave: Appointment;

  constructor(private service : AppointmentService, private toastr: ToastrService,
    private tokenService: TokenService){ }

  ngOnInit(){
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
        backgroundColor: '#dddddd'
      },
    ],
    //businessHours: this.calendarEvents,

    events: this.calendarEvents,
    initialView: 'timeGridWeek',
    //initialEvents: INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
    weekends: false,
    editable: false,
    defaultTimedEventDuration:'00:15',
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this)
    /* you can update a remote database when these fire:
    eventAdd:
    eventChange:
    eventRemove:
    */
  };

  currentEvents: EventApi[] = [];

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
               title: element.message,
               start: element.time,
               backgroundColor: '#dddddd',
               textColor: '#dddddd',
               borderColor: '#dddddd'
             },)
         })
         this.calendarOptions.events = this.calendarEvents;
       })
     }

  handleDateSelect(selectInfo: DateSelectArg) {
    const title = prompt('írd le a problémádat pár szóban');
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
        calendarApi.addEvent({
        id: createEventId()+'f',
        title,
        start: selectInfo.startStr,
        //end: selectInfo.startStr+1,
        //allDay: selectInfo.allDay
      });

                //selectInfo.start.getDay();
      this.service.saveAppointment(this.username, new Appointment(null,title,selectInfo.startStr)).subscribe(
        data => {
          window.location.reload();
        },
        err => {
          this.toastr.error('Sikertelen időpontfoglalás!', 'Hiba!', {
            timeOut: 3000,  positionClass: 'toast-top-center',
          });
        }
      )
      this.toastr.success('Sikeres időpontfoglalás!', 'OK', {
        timeOut: 3000,  positionClass: 'toast-top-center',
      });
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
