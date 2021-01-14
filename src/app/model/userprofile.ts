import { User } from './user';

export class Userprofile {

  constructor(
    public id: number = null,
    public picture: string = null,
    public dateOfBorn: Date = new Date(),
    public address: string = null,
    public idCard: string = null,
    public socSecNum: string = null,
    public activation: string = null,
    public isenabled: boolean = false,
    public practitionerId: number = null,
    public user: User = null
  ){}

}
