import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/model/user';
import { AdminDashboardService } from 'src/app/service/admin-dashboard.service';


@Component({
  selector: 'app-general-practitioner-details',
  templateUrl: './general-practitioner-details.component.html',
  styleUrls: ['./general-practitioner-details.component.css']
})
export class GeneralPractitionerDetailsComponent implements OnInit {

  id: number;
  practitioner: User;
  errorMessage: string;

  constructor(private route: ActivatedRoute,private router: Router,
    private adminService: AdminDashboardService, private toastr: ToastrService) { }

  ngOnInit() {
     this.id = this.route.snapshot.params['id'];

    this.adminService.getPatientById(this.id)
      .subscribe(
        data => {
          this.practitioner = data;
        },
        err => {
          this.errorMessage = err.error.message;
          this.toastr.error(this.errorMessage, 'Hiba!', {
            timeOut: 3000,  positionClass: 'toast-top-center',
          });
        }

      );
    }

  list(){
    this.router.navigate(['practitioners']);
  }
}
