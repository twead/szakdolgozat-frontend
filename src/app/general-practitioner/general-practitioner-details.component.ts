import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from '../model/user';
import { AdminDashboardService } from '../service/admin-dashboard.service';

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
    this.practitioner = new User();

    this.id = this.route.snapshot.params['id'];

    this.adminService.getPractionerById(this.id)
      .subscribe(
        data => {
          console.log(data)
          this.practitioner = data;
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

  list(){
    this.router.navigate(['practitioners']);
  }
}
