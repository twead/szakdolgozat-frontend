export class ProfilePictureDto {
  username: string;
  file: File

  constructor(username: string, file: File){
    this.username = username;
    this.file = file;
  }
}
