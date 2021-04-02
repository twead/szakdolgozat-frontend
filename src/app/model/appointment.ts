import { Patient } from "./patient";
import { Practitioner } from "./practitioner";

export class Appointment {

  constructor(
    public id: string,
    public message: string = null,
    public time: string = null,
    public patient: Patient = null,
    public practitioner: Practitioner = null
    ){}

}
