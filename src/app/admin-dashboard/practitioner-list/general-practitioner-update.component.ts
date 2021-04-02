import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/model/user';
import { AdminDashboardService } from 'src/app/service/admin-dashboard.service';


@Component({
  selector: 'app-general-practitioner-update',
  templateUrl: './general-practitioner-update.component.html',
  styleUrls: ['./general-practitioner-update.component.css']
})
export class GeneralPractitionerUpdateComponent implements OnInit {

  id: number;
  practitioner: User;

  name : string;
  username : string;
  email : string;
  address: string;
  dateOfBorn: Date;
  phoneNumber: string;

  minDate = new Date(1900,1,1);
  maxDate = new Date();


  errorMessage: string;

  constructor(private route: ActivatedRoute,private router: Router,
    private adminService: AdminDashboardService, private toastr: ToastrService) { }

  ngOnInit() {

    this.id = this.route.snapshot.params['id'];

    this.adminService.getPatientById(this.id)
      .subscribe(data => {
        console.log(data)
        this.practitioner = data;
        this.name = this.practitioner.patient.name;
        this.username = this.practitioner.username;
        this.email = this.practitioner.patient.email;
        this.address = this.practitioner.patient.address;
        this.dateOfBorn = this.practitioner.patient.dateOfBorn;
        this.phoneNumber = this.practitioner.patient.phoneNumber;
      }, error => {

      });
  }

  updatePractitioner() {
    this.practitioner.patient.name = this.name;
    this.practitioner.username = this.username;
    this.practitioner.patient.email = this.email;
    this.practitioner.patient.address = this.address;
    this.practitioner.patient.dateOfBorn = this.dateOfBorn;
    this.practitioner.patient.phoneNumber = this.phoneNumber;

    this.adminService.updatePatient(this.id, this.practitioner)
      .subscribe(data => {
        this.toastr.success('Sikeres módosítás!', 'OK', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
        this.gotoList();
      }, err => {
        this.errorMessage = err.error.message;
        this.toastr.error(this.errorMessage, 'Hiba!', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
      }
    );
  }

  onSubmit() {
    this.updatePractitioner();
  }

  gotoList() {
    this.router.navigate(['/practitioners']);
  }
}
