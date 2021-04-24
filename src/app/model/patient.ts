import { Appointment } from "./appointment";
import { User } from "./user";

export class Patient {

  constructor(
    public id: number = null,
    public name: string = null,
    public email: string = null,
    public address: string = null,
    public dateOfBorn: Date = new Date(),
    public phoneNumber: string = null,
    public picture: string = null,
    public practitionerId: number = null,
    public user: User = null,
    public appointments: Array<Appointment> = null
  ){}

}
