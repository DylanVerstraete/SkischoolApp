import { Component, OnInit, HostBinding, ViewEncapsulation } from '@angular/core';
import { User } from '../models/user';
import { AuthenticationService } from '../services/authentication.service';
import { UserService } from '../services/user.service';
import {MatDialogModule} from '@angular/material/dialog';
import { MatDialog } from '@angular/material';
import { CardBuyComponent } from './card-buy/card-buy.component';

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

  constructor(private authenticationService: AuthenticationService, private userService: UserService, public dialog: MatDialog) {
    this.bgColor = "none";
    //document.getElementById('body').style.background = "none";        
    
  }

  ngOnInit() {
    this.userService.getCurrentUser().subscribe(user => {
      this.user = user;
      console.log(this.user);
      this.pendingCards = this.user.skicards.filter(e => e.payed == false);
      this.payedCards = this.user.skicards.filter(e => e.payed == true);      
      this.calculateTurns();
    });
  }

  buy() {
    let dialogRef = this.dialog.open(CardBuyComponent, {
      width: '500px',
      data: {
        message: "U heeft betaald!"
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if(result == "ok"){
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
      }
     
    });
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
    this.userService.makeMember(this.user).subscribe(data => {console.log(data),this.user = data});
  }

  undoMember(){
    this.userService.undoMember(this.user).subscribe(data => this.user = data);
  }

}
