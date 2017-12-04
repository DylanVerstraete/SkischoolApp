import { Component, OnInit  } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { User } from '../models/user';
import decode from 'jwt-decode';

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

  constructor(private authenticationService: AuthenticationService, private router: Router) {
    authenticationService.userIsloggedIn.subscribe(isLoggedIn => {
      this.userIsLoggedIn = isLoggedIn;
      this.user = authenticationService.getUser();
      if(this.userIsLoggedIn){
        var token = authenticationService.getUserInfo();
        if(token.role == "admin"){
          this.isAdmin = true;
        }
      }
      
    });
  }

  ngOnInit(): void {
    this.user = this.authenticationService.getUser();
    this.userIsLoggedIn = this.user != undefined;
    if(this.userIsLoggedIn){
      this.isAdmin = this.authenticationService.getUserInfo().token.role == "admin";
    }

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
