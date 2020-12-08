import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from '../model/user';
import { AdminDashboardService } from '../service/admin-dashboard.service';

@Component({
  selector: 'app-general-practitioner-update',
  templateUrl: './general-practitioner-update.component.html',
  styleUrls: ['./general-practitioner-update.component.css']
})
export class GeneralPractitionerUpdateComponent implements OnInit {

  id: number;
  practitioner: User;
  errorMessage: string;

  constructor(private route: ActivatedRoute,private router: Router,
    private adminService: AdminDashboardService, private toastr: ToastrService) { }

  ngOnInit() {

    this.id = this.route.snapshot.params['id'];

    this.adminService.getPractionerById(this.id)
      .subscribe(data => {
        console.log(data)
        this.practitioner = data;
      }, error => console.log(error));
  }

  updatePractitioner() {
    this.adminService.updatePractitioner(this.id, this.practitioner)
      .subscribe(data => {
        console.log(data);
        this.gotoList();
      }, err => {
        this.errorMessage = err.error.message;
        this.toastr.error(this.errorMessage, 'Hiba!', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
        console.log(err)
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

