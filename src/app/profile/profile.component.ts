import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { AuthenticationService } from '../services/authentication.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: User;

  constructor(private authenticationService: AuthenticationService, private userService: UserService) { 
  }

  ngOnInit() {
    this.userService.getCurrentUser().subscribe(user => this.user = user);
  }

}
