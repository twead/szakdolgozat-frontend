import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '../service/token.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  isLogged = false;
  roles: string[];
  isAdmin = false;

  constructor(private tokenService: TokenService, private router: Router) { }

  ngOnInit(): void {
    if(this.tokenService.getToken()){
      this.isLogged = true;
    }
    else{
      this.isLogged = false;
    }

    this.roles = this.tokenService.getAuthorities();
    this.roles.forEach(
      role => {
        if(role === 'ROLE_ADMIN'){ this.isAdmin = true; }
      }
    )
  }

  onLogout(): void {
      this.tokenService.logOut();
      window.location.reload();
      this.router.navigate(['/']);
  }

}
