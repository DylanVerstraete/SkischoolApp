import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { AuthenticationService } from '../services/authentication.service';
import decode from 'jwt-decode';

@Injectable()
export class AdminAuthGuard implements CanActivate {
  user: User;
  result: boolean;
  isAdmin: boolean;
  constructor(private router: Router, private authservice: AuthenticationService) {

   }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let user = JSON.parse(localStorage.getItem('currentUser'));
    // decode the token to get its payload
    const tokenPayload = decode(user.token);
    if (localStorage.getItem('currentUser') && tokenPayload.role == "admin") {
      // logged in and admine so true
      return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/']);
    return false;
  }

}
