import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { TokenService } from '../service/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent {

  isLogged = false;
  isPatient = false;
  isPractitioner = false;
  isAdmin = false;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, private tokenService: TokenService, private router: Router) {}

  ngOnInit(): void {
    this.isLogged = this.tokenService.isLogged();
    this.isAdmin = this.tokenService.IsAdmin();
    this.isPractitioner = this.tokenService.IsPractitioner();
    this.isPatient = this.tokenService.IsPatient();
  }

  onLogout(): void {
      this.tokenService.logOut();
      window.location.reload()
      this.router.navigate(['/']);
  }
}
