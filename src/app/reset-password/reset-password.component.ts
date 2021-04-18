import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UpdatePasswordDto } from '../dto/update-password-dto';
import { User } from '../model/user';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  password: string;
  confirmpassword: string;

  constructor(private authService: AuthService, private router: Router,
    private activatedRoute: ActivatedRoute, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.resetPassword();
  }

  resetPassword(){
    this.authService.resetPassword(this.activatedRoute.snapshot.url[1].path).subscribe(
      data => {
      },
      error => {
      }
    );
  }

  onSubmit(){
    this.authService.updatePassword(this.activatedRoute.snapshot.url[1].path, new UpdatePasswordDto(this.password)).subscribe(
      data => {
        this.toastr.success('Sikeres jelszómódosítás!', 'OK', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
        this.router.navigate(['/login']);
      },
      error => {
        this.toastr.error('Sikertelen jelszómódosítás!', 'Hiba!', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
      }
    );
  }

}
