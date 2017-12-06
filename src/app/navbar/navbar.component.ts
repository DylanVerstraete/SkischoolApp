import { Component, OnInit  } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { User } from '../models/user';
import decode from 'jwt-decode';
import { Observable } from 'rxjs/Observable';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  title = 'navbar';
  userIsLoggedIn: boolean;
  isAdmin: boolean;
  user : User;
  admin: User;

  constructor(private authenticationService: AuthenticationService, private router: Router) {
    authenticationService.userIsloggedIn.subscribe(isLoggedIn => {
      this.userIsLoggedIn = isLoggedIn;
      this.user = authenticationService.getUser();
      console.log(this.userIsLoggedIn)
      authenticationService.isAdmin.subscribe(isAdmin => {
        this.isAdmin = isAdmin
        console.log(this.isAdmin)
      });
           
    });
  }

  ngOnInit(): void {
    this.user = this.authenticationService.getUser();
    this.userIsLoggedIn = this.user != undefined;
    //this.admin = this.authenticationService.getAdmin();
    this.isAdmin = this.admin != undefined;
  }

  logout($event): void {
    $event.preventDefault();

    this.authenticationService.logout().then(success => {
      if (success) {
        this.router.navigateByUrl('/login');
      }
    });
  }
}
