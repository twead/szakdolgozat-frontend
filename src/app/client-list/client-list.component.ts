import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ClientCrudDto } from '../dto/client-crud-dto';
import { PractitionerDashboardService } from '../service/practitioner-dashboard.service';
import { TokenService } from '../service/token.service';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit {

  username: string;
  clients: Array<ClientCrudDto> = [];
  errorMessage: string;
  name: any;
  totalRecords: number;
  page:number = 1;
  preFilePath = 'https://s3.us-east-2.amazonaws.com/onlinehealthcaresystem/';

  constructor(private service: PractitionerDashboardService, private tokenService: TokenService,
              private toastr: ToastrService) { }

  ngOnInit() {
    this.username = this.tokenService.getUserName();
    this.getClients();
  }

  getClients() {
    this.service.getAllClient(this.username).subscribe(
      response => {
        this.clients = response;
      },
      error => {
        // TODO: Error message
      }
    );
  }

  deleteAppointment(id: number) {
    this.service.deleteAppointment(id)
      .subscribe(
        data => {
          this.toastr.success('Foglalás törölve!', 'OK', {
            timeOut: 3000,  positionClass: 'toast-top-center',
          });
          this.getClients();
        },
        err => {
          this.errorMessage = err.error.message;
          this.toastr.error(this.errorMessage, 'Hiba!', {
            timeOut: 3000,  positionClass: 'toast-top-center',
          });
        }
      );
  }

  search(){
    if(this.name == ""){
      this.ngOnInit();
    } else{
      this.clients = this.clients.filter(res=>{
        return res.clientName.toLocaleLowerCase().match(this.name.toLocaleLowerCase());
      })
    }
  }
}

