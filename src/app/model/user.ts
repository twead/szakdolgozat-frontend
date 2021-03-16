import { Patient } from './patient';
import { Practitioner } from './practitioner';
import { Role } from './role';

export class User {

  constructor(
    public id: number = null,
    public username: string = null,
    public password: string = null,
    public activation: string = null,
    public isenabled: boolean = false,
    public roles: Array<Role> = [],
    public patient: Patient = null,
    public practitioner: Practitioner = null
    ){}


}
