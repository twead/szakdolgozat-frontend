import { Appointment } from "./appointment";
import { User } from "./user";
import { Worktime } from "./worktime";

export class Practitioner {

    constructor(
      public id: number = null,
      public workingAddress: string = null,
      public worksOnHolidays: boolean = null,
      public specialization: string = null,
      public user: User = null,
      public worktimes: Array<Worktime> = null,
      public appointments: Array<Appointment> = null
    ){}

}
