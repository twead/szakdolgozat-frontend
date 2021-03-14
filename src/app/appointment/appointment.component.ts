import { Component, ViewChild } from '@angular/core';
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi } from '@fullcalendar/angular';
import { INITIAL_EVENTS, createEventId } from './event-utils';
import huLocale from '@fullcalendar/core/locales/hu';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent {

  title = "asdas";


  calendarVisible = true;
  calendarOptions: CalendarOptions = {
    locale: huLocale,
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
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

    initialView: 'timeGridWeek',
    initialEvents: INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
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

  handleDateSelect(selectInfo: DateSelectArg) {
    const title = prompt('Biztosan lefoglalod az időpontot?');
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        //end: selectInfo.startStr+1,
        //allDay: selectInfo.allDay
      });
    } else {
      calendarApi.addEvent({
        id: createEventId(),
        title : "foglalás", //in the case of missing title, still save
        start: selectInfo.startStr,
      });
    }
  }

  handleEventClick(clickInfo: EventClickArg) {
    if (confirm(`Biztosan törölöd a foglalásod? '${clickInfo.event.title}'`)) {
      clickInfo.event.remove();
    }
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
  }

}
