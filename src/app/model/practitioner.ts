import { User } from "./user";

export class Practitioner {

    constructor(
      public id: number = null,
      public workingAddress: string = null,
      public user: User = null
    ){}

}
