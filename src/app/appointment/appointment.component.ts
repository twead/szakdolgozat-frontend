import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi } from '@fullcalendar/angular';
import { EventInput } from '@fullcalendar/core'
import huLocale from '@fullcalendar/core/locales/hu';
import { Appointment } from '../model/appointment';
import { AppointmentService } from '../service/appointment.service';
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

  constructor(private service : AppointmentService, private tokenService: TokenService){ }

  ngOnInit(){
    this.showAppointments();
  }

  calendarVisible = true;
  calendarOptions: CalendarOptions = {
    locale: huLocale,
    headerToolbar: {
      left: 'prev,next',
      center: 'title',
      right: 'today'
    },
    slotDuration: '00:15',
    slotLabelInterval: 15,
    slotMinTime: '6:00',
    slotMaxTime: '20:00',

    businessHours: [ // specify an array instead
      {
        daysOfWeek: [ 1, 2, 3 ], // Monday, Tuesday, Wednesday
        startTime: '08:00', // 8am
        endTime: '18:00' // 6pm
      },
      {
        daysOfWeek: [ 4, 5 ], // Thursday, Friday
        startTime: '10:00', // 10am
        endTime: '16:00' // 4pm
      },
    ],

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

  showAppointments(){
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


      this.service.saveAppointment(this.username, new Appointment(null,title,selectInfo.startStr)).subscribe(
        data => {

        },
        err => {

        }
      )
    } else {

    }
  }

  handleEventClick(clickInfo: EventClickArg) {
    if (confirm(`Biztosan törölöd a foglalásod? '${clickInfo.event.title}'`)) {
      this.service.deleteAppointment(clickInfo.event.id).subscribe(
        data => {

        },
        err => {

        }
      );
      clickInfo.event.remove();
    }
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
  }

}
