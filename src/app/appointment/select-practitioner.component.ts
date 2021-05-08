import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { User } from '../model/user';
import { UserProfileService } from '../service/user-profile.service';
import { TokenService } from '../service/token.service';

@Component({
  selector: 'app-select-practitioner',
  templateUrl: './select-practitioner.component.html',
  styleUrls: ['./select-practitioner.component.css']
})
export class SelectPractitionerComponent implements OnInit {

  username: string = this.tokenService.getUserName();
  profileData: User;

  practitioners: Array<User> = [];
  errorMessage: string;

  constructor(private userProfileService: UserProfileService, private tokenService: TokenService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getProfile();
  }

  getProfile(){
    this.profileData = new User();

    this.userProfileService.getProfileDetails(this.username)
      .subscribe(
        data => {
          this.profileData = data;
        },
        err => {
          this.toastr.error('Nem létezik a felhasználó', 'Hiba!', {
            timeOut: 3000,  positionClass: 'toast-top-center',
          });
        }

      );
  }
}
