import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { TokenService } from '../service/token.service';

@Injectable({
  providedIn: 'root'
})
export class ProdGuardService implements CanActivate {

  realRole: string;
  realRole2: string;

  constructor(
    private tokenService: TokenService,
    private router: Router
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
      const expectedRole = route.data.expectedRole;
      this.realRole = this.tokenService.IsAdmin ? 'admin' : 'user';
      this.realRole2 = this.tokenService.IsPractitioner ? 'practitioner' : 'user';
      if (!this.tokenService.isLogged() || expectedRole.indexOf(this.realRole) < 0 && expectedRole.indexOf(this.realRole2) < 0) {
        this.router.navigate(['/']);
        return false;
      }
      return true;
    }
}
