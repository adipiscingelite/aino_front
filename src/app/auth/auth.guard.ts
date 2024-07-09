import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, CanActivate } from "@angular/router";
import { CookieService } from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private cookieService: CookieService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.cookieService.get('userToken')) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}