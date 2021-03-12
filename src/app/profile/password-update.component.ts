import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PatientService } from '../service/patient.service';
import { TokenService } from '../service/token.service';

@Component({
  selector: 'app-password-update',
  templateUrl: './password-update.component.html',
  styleUrls: ['./password-update.component.css']
})
export class PasswordUpdateComponent implements OnInit {

username: string;
password: string;
confirmpassword: string;
errorMessage: string;

constructor(private tokenService: TokenService, private patientService: PatientService,
  private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
    this.username = this.tokenService.getUserName();
  }

  editProfile() {
    this.patientService.updatePassword(this.username, this.password)
      .subscribe(data => {
        this.toastr.error('', 'Sikeres jelszó módosítás!', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
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

  gotoList(){
    this.router.navigate(['/profile']);
  }

  onSubmit(){
    this.editProfile();
  }
}
