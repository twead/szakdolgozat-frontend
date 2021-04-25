export class HolidaysDto {

  slotMinTime: string;
  slotMaxTime: string;
  defaultTimePerClient :number;
  worksOnHoliday: boolean;

  constructor(slotMinTime: string, slotMaxTime: string, defaultTimePerClient :number, worksOnHoliday: boolean){
    this.slotMinTime = slotMinTime;
    this.slotMaxTime = slotMaxTime;
    this.defaultTimePerClient = defaultTimePerClient;
    this.worksOnHoliday = worksOnHoliday;
  }
}
