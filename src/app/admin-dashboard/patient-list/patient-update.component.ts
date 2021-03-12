import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/model/user';
import { AdminDashboardService } from 'src/app/service/admin-dashboard.service';

@Component({
  selector: 'app-patient-update',
  templateUrl: './patient-update.component.html',
  styleUrls: ['./patient-update.component.css']
})
export class PatientUpdateComponent implements OnInit {

  id: number;
  patient: User;

  name : string;
  username : string;
  email : string;
  address: string;
  dateOfBorn: Date;

  errorMessage: string;

  constructor(private route: ActivatedRoute,private router: Router,
    private adminService: AdminDashboardService, private toastr: ToastrService) { }

  ngOnInit() {

    this.id = this.route.snapshot.params['id'];

    this.adminService.getPatientById(this.id)
      .subscribe(
        data => {
          this.patient = data;
          this.name = this.patient.patient.name;
          this.username = this.patient.username;
          this.email = this.patient.patient.email;
          this.address = this.patient.patient.address;
          this.dateOfBorn = this.patient.patient.dateOfBorn;
      }, error => {

      });
  }

  updatePatient() {
    this.patient.patient.name = this.name;
    this.patient.username = this.username;
    this.patient.patient.email = this.email;
    this.patient.patient.address = this.address;
    this.patient.patient.dateOfBorn = this.dateOfBorn;

    this.adminService.updatePatient(this.id, this.patient)
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
    this.updatePatient();
  }

  gotoList() {
    this.router.navigate(['/patients']);
  }

}
