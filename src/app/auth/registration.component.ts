import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NewUser } from '../model/new-user';
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
  isLogged = false;
  errorMessage: string;

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
    this.newUser = new NewUser(this.name, this.username, this.email, this.password);
    this.authService.addUser(this.newUser).subscribe(
      data => {
        this.toastr.success('Registration successful', 'OK', {
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
}
