export class NewUser {
  name: string;
  username: string;
  email: string;
  password: string;

  //PROFILE
  address: string;
  dateOfBorn: Date;
  idCard: string;
  socSecNum: string;

  constructor(name: string, username: string, email: string, password: string,
    address: string, idCard: string, socSecNum: string, dateOfBorn: Date){
    this.name = name;
    this.username = username;
    this.email = email;
    this.password = password;
    this.address = address;
    this.idCard = idCard;
    this.socSecNum = socSecNum;
    this.dateOfBorn = dateOfBorn;
  }
}
