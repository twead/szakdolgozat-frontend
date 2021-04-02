import { Component, ViewEncapsulation } from '@angular/core';
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi } from '@fullcalendar/angular';
import { BusinessHoursInput, EventInput } from '@fullcalendar/core'
import huLocale from '@fullcalendar/core/locales/hu';
import { ToastrService } from 'ngx-toastr';
import { InstructionDto } from '../dto/instruction-dto';
import { Appointment } from '../model/appointment';
import { User } from '../model/user';
import { AppointmentService } from '../service/appointment.service';
import { PatientService } from '../service/patient.service';
import { TokenService } from '../service/token.service';
import { createEventId, HOLIDAYS } from './event-utils';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppointmentComponent {

  username: string = this.tokenService.getUserName();
  profileData: User;
  toSave: Appointment;
  errorMessage: string;
  dayNumber: number = null;

  bh: BusinessHoursInput = [{
    start: '18:00',
    end: '20:00',
    dayOfWeek:[1]
  }];
  arNum: Array<number>;

  calendarEvents: EventInput[] = [];
  customBusinessHours: EventInput[] = [];
  myCalendarEventForInstruction?: InstructionDto[] = [];

  wantToWorkOnHolidays: boolean;


  constructor(private service : AppointmentService, private toastr: ToastrService,
    private tokenService: TokenService, private patientService: PatientService){ }

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

    businessHours: [],

    selectConstraint:[],

    validRange: {
      start: Date.now(),
      end: Date.now() + 1000*60*60*24*31 //+1 year
    },
    events: this.calendarEvents,
    initialView: 'timeGridWeek',
    firstDay: this.dayNumber,
    weekends: false,
    editable: false,
    defaultTimedEventDuration:'00:15',
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

    this.patientService.getProfileDetails(this.username)
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
        this.wantToWorkOnHolidays = data.worksOnHoliday;
        this.getYourDoctorBusinessHours();
      },
      error => {

      }
    )
  }

  getYourDoctorBusinessHours(){
    this.service.getBusinessHours(this.username).subscribe(
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
  }
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
  }

}
