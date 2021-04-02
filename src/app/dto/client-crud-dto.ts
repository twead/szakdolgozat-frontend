export class ClientCrudDto {

  constructor(
    public appointmentId: number = null,
    public clientName: string = null,
    public time: string = null,
    public message: string = null
    ){}

}
