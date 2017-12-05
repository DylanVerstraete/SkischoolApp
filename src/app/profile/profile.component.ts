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
  pendingCards: any = {};
  payedCards: any = {};

  @HostBinding('body.background-color')
  bgColor;

  constructor(private authenticationService: AuthenticationService, private userService: UserService) {
    this.bgColor = "none";
    //document.getElementById('body').style.background = "none";        
    
  }

  ngOnInit() {
    this.userService.getCurrentUser().subscribe(user => {
      this.user = user;
      this.pendingCards = this.user.skicards.filter(e => e.payed == false);
      this.payedCards = this.user.skicards.filter(e => e.payed == true);      
      this.calculateTurns();
    });
  }

  buy() {
    let skiCard = {
      numberOfTurns: 10,
      turns: [],
      payed: false
    }
    //this.user.skicards.push(skiCard);
    this.userService.requestCard(this.user).subscribe(data => {
      this.user = data;
      this.calculateTurns();
    });
    //this.userService.addSkiCard(this.user).subscribe(data => this.user = data);
    
  }

  calculateTurns(){
    this.payedCards = this.user.skicards.filter(e => e.payed == true);      
    this.pendingCards = this.user.skicards.filter(e => e.payed == false);    
    this.numberOfTurns = 0;
    this.user.skicards.forEach(elem => {
      if(elem.payed == true){
        this.numberOfTurns += elem.numberOfTurns;        
      }
    });
  }

  makeMember(){
    this.userService.makeMember(this.user).subscribe(data => this.user = data);
  }

  undoMember(){
    this.userService.undoMember(this.user).subscribe(data => this.user = data);
  }

}
