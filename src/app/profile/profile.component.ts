import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from '../model/user';
import { PatientService } from '../service/patient.service';
import { TokenService } from '../service/token.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  username: string = this.tokenService.getUserName();
  profileData: User;

  constructor(private router: Router, private patietService: PatientService,
              private tokenService: TokenService, private toastr: ToastrService) { }

  ngOnInit() {
    this.getProfile();
    }

    getProfile(){
      this.profileData = new User();

      this.patietService.getProfileDetails(this.username)
        .subscribe(
          data => {
            this.profileData = data;
          },
          err => {
            this.toastr.error('Nem létezik a felhasználó', 'Hiba!', {
              timeOut: 3000,  positionClass: 'toast-top-center',
            });
            console.log(err)
          }

        );
    }

    updateProfile(){
      this.router.navigate(['profile-update']);
    }

    updatePassword(){
      this.router.navigate(['password-update']);
    }

}
