import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from '../model/user';
import { PatientService } from '../service/patient.service';
import { TokenService } from '../service/token.service';

@Component({
  selector: 'app-profile-update',
  templateUrl: './profile-update.component.html',
  styleUrls: ['./profile-update.component.css']
})
export class ProfileUpdateComponent implements OnInit {

  username: string;
  updateProfile: User;
  errorMessage: string;

  address: string;
	idCard: string;
  socSecNum: string;
  dateOfBorn: Date;

  minDate = new Date(1900,1,1);
  maxDate = new Date();

  constructor(private tokenService: TokenService, private patientService: PatientService,
              private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
    this.updateProfile = new User();
    this.username = this.tokenService.getUserName();

    this.patientService.getProfileDetails(this.username)
    .subscribe(data => {
      this.updateProfile = data;
      this.address = this.updateProfile.userProfile.address;
      this.idCard = this.updateProfile.userProfile.idCard;
      this.socSecNum = this.updateProfile.userProfile.socSecNum;
      this.dateOfBorn = this.updateProfile.userProfile.dateOfBorn;
    }, error => console.log(error));

  }

  editProfile() {
    this.updateProfile.userProfile.address = this.address;
    this.updateProfile.userProfile.idCard = this.idCard;
    this.updateProfile.userProfile.socSecNum = this.socSecNum;
    this.updateProfile.userProfile.dateOfBorn = this.dateOfBorn;

    this.patientService.updateProfile(this.username, this.updateProfile)
      .subscribe(data => {
        console.log(data);
//        this.updateProfile;
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

  gotoList() {
    this.router.navigate(['/profile']);
  }

  onSubmit() {
    this.editProfile();
  }


}
