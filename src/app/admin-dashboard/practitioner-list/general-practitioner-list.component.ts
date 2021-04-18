import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/model/user';
import { AdminDashboardService } from 'src/app/service/admin-dashboard.service';

@Component({
  selector: 'app-general-practitioner-list',
  templateUrl: './general-practitioner-list.component.html',
  styleUrls: ['./general-practitioner-list.component.css']
})
export class GeneralPractitionerListComponent implements OnInit {

  practitioners: Array<User> = [];
  errorMessage: string;
  name: any;
  totalRecords: number;
  page:number = 1;

  constructor(private adminService: AdminDashboardService, private router: Router,
              private toastr: ToastrService) { }

  ngOnInit() {
    this.getPractitioners();
  }

  getPractitioners() {
    this.adminService.getAllPractitioner().subscribe(
      response => {
        this.practitioners = response;
      },
      error => {
      }
    );
  }

  downgradeToPatient(id: number){
    this.adminService.downgradeToPatient(id).subscribe(
      data => {
        this.toastr.success('Ez a felhasználó mostantól nem orvos!', 'OK', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
        window.location.reload();
      },
      error => {
        this.errorMessage = error.error.message;
          this.toastr.error(this.errorMessage, 'Hiba!', {
            timeOut: 3000,  positionClass: 'toast-top-center',
          });
      }
    )
  }

  getPractitionerDetails(id: number){
    this.router.navigate(['practitioners/details', id]);
  }

  updatePractitioner(id: number){
    this.router.navigate(['practitioners/update', id]);
  }

  search(){
    if(this.name == ""){
      this.ngOnInit();
    } else{
      this.practitioners = this.practitioners.filter(res=>{
        return res.patient.name.toLocaleLowerCase().match(this.name.toLocaleLowerCase());
      })
    }
  }

}

