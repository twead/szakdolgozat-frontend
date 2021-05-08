export class ClientCrudDto {

  constructor(
    public appointmentId: number = null,
    public username: string = null,
    public picture: string = null,
    public clientName: string = null,
    public time: string = null,
    public phoneNumber: string = null,
    public message: string = null
    ){}

}
