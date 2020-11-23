import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';
import { AdminDashboardService } from '../service/admin-dashboard.service';

@Component({
  selector: 'app-general-practitioner-list',
  templateUrl: './general-practitioner-list.component.html',
  styleUrls: ['./general-practitioner-list.component.css']
})
export class GeneralPractitionerListComponent implements OnInit {

  practitioners: Array<User> = [];

  constructor(private adminService: AdminDashboardService) { }

  ngOnInit(): void {
    this.getProjects();
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

}

