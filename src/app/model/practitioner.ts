import { User } from "./user";
import { Worktime } from "./worktime";

export class Practitioner {

    constructor(
      public id: number = null,
      public workingAddress: string = null,
      public worksOnHolidays: boolean = null,
      public user: User = null,
      public worktime: Worktime = null
    ){}

}
