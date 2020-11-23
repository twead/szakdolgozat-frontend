import { User } from './user';

export class Userprofile {

  constructor(
    public id: Number = null,
    public picture: String = null,
    public dateOfBorn: Date = null,
    public address: String = null,
    public idCard: String = null,
    public socSecNum: String = null,
    public activation: String = null,
    public isenabled: Boolean = false,
    public user: User = null
  ){}

}
