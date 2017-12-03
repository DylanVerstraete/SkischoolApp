import { Component, OnInit, HostBinding, ViewEncapsulation } from '@angular/core';
import { User } from '../models/user';
import { AuthenticationService } from '../services/authentication.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  encapsulation: ViewEncapsulation.None    
})
export class ProfileComponent implements OnInit {

  user: User;
  numberOfTurns: number = 0;


  @HostBinding('body.background-color')
  bgColor;

  constructor(private authenticationService: AuthenticationService, private userService: UserService) {
    this.bgColor = "none";
    //document.getElementById('body').style.background = "none";        
    
  }

  ngOnInit() {
    this.userService.getCurrentUser().subscribe(user => {
      this.user = user;
      this.calculateTurns();
    });
  }

  buy() {
    let skiCard = {
      numberOfTurns: 10
    }
    this.user.skicards.push(skiCard);
    this.userService.addSkiCard(this.user).subscribe(data => this.user = data);
    this.calculateTurns();
  }

  calculateTurns(){
    this.numberOfTurns = 0;
    this.user.skicards.forEach(elem => {
      this.numberOfTurns += elem.numberOfTurns;
    });
  }

  makeMember(){
    this.userService.makeMember(this.user).subscribe(data => this.user = data);
  }

  undoMember(){
    this.userService.undoMember(this.user).subscribe(data => this.user = data);
  }

}
