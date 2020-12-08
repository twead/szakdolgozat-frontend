import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NewUser } from '../dto/new-user';
import { AuthService } from '../service/auth.service';
import { TokenService } from '../service/token.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  newUser: NewUser;
  name: string;
  username: string;
  email: string;
  password: string;
  address: string;
	idCard: string;
  socSecNum: string;
  dateOfBorn: Date;

  isLogged = false;
  errorMessage: string;

  minDate = new Date(1900,1,1);
  maxDate = new Date();


  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    if(this.tokenService.getToken()){
      this.isLogged = true;
    }
  }

  onRegister(): void{
    this.newUser = new NewUser(this.name, this.username, this.email, this.password,
      this.address, this.idCard, this.socSecNum, this.dateOfBorn);
    this.authService.addUser(this.newUser).subscribe(
      data => {
        this.toastr.success('Sikeres regisztráció!', 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });

        this.router.navigate(['/login']);
      },
      err => {
        this.errorMessage = err.error.message;
        this.toastr.error(this.errorMessage, 'Fail', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });

      }
    );
  }

  log(x){
    console.log(x); //Browser->Console->NgModel properties
  }

}
