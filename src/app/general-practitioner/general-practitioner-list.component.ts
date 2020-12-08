import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from '../model/user';
import { AdminDashboardService } from '../service/admin-dashboard.service';

@Component({
  selector: 'app-general-practitioner-list',
  templateUrl: './general-practitioner-list.component.html',
  styleUrls: ['./general-practitioner-list.component.css']
})
export class GeneralPractitionerListComponent implements OnInit {

  practitioners: Array<User> = [];
  errorMessage: string;

  constructor(private adminService: AdminDashboardService, private router: Router,
              private toastr: ToastrService) { }

  ngOnInit() {
    this.getProjects();
  }

  deletePractitioner(id: number) {
    this.adminService.deletePractitioner(id)
      .subscribe(
        data => {
          console.log(data);
          this.getProjects();
        },
        err => {
          this.errorMessage = err.error.message;
          this.toastr.error(this.errorMessage, 'Hiba!', {
            timeOut: 3000,  positionClass: 'toast-top-center',
          });
          console.log(err)
        }
      );
  }

  getProjects() {
    this.adminService.getAllPractitioner().subscribe(
      response => {
        this.practitioners = response;
      },
      error => {
        // TODO: Error message
      }
    );
  }

  getPractitionerDetails(id: number){
    this.router.navigate(['details', id]);
  }

  updatePractitioner(id: number){
    this.router.navigate(['update', id]);
  }

}

