import { EventInput } from '@fullcalendar/angular';

let eventGuid = 0;
var dateNow = new Date;

export const HOLIDAYS: EventInput[] = [
  {
    start: dateNow.getFullYear().toString()+'01-01T00:00:00',
    end: dateNow.getFullYear().toString()+'01-01T24:00:00',
  },
  {
    start: dateNow.getFullYear().toString()+'03-15T00:00:00',
    end: dateNow.getFullYear().toString()+'03-15T24:00:00',
  },
  {
    start: dateNow.getFullYear().toString()+'05-01T00:00:00',
    end: dateNow.getFullYear().toString()+'05-01T24:00:00',
  },
  {
    start: dateNow.getFullYear().toString()+'08-20T00:00:00',
    end: dateNow.getFullYear().toString()+'08-20T24:00:00',
  },
  {
    start: dateNow.getFullYear().toString()+'10-23T00:00:00',
    end: dateNow.getFullYear().toString()+'10-23T24:00:00',
  },
  {
    start: dateNow.getFullYear().toString()+'11-01T00:00:00',
    end: dateNow.getFullYear().toString()+'11-01T24:00:00',
  },
  {
    start: dateNow.getFullYear().toString()+'12-24T00:00:00',
    end: dateNow.getFullYear().toString()+'12-24T24:00:00',
  },
  {
    start: dateNow.getFullYear().toString()+'12-25T00:00:00',
    end: dateNow.getFullYear().toString()+'12-25T24:00:00',
  },
];

export function createEventId() {
  return String(eventGuid++);
}

