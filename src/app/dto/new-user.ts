export class NewUser {
  name: string;
  username: string;
  email: string;
  password: string;
  address: string;
  dateOfBorn: Date;

  constructor(name: string, username: string, email: string, password: string,
    address: string, dateOfBorn: Date){
    this.name = name;
    this.username = username;
    this.email = email;
    this.password = password;
    this.address = address;
    this.dateOfBorn = dateOfBorn;
  }
}
