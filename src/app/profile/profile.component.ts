import { Component, OnInit, HostBinding, ViewEncapsulation, ViewContainerRef } from '@angular/core';
import { User } from '../models/user';
import { AuthenticationService } from '../services/authentication.service';
import { UserService } from '../services/user.service';
import {MatDialogModule} from '@angular/material/dialog';
import { MatDialog } from '@angular/material';
import { CardBuyComponent } from './card-buy/card-buy.component';
import { MemberAddComponent } from './member-add/member-add.component';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

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
  isPendingMember: boolean
  isNoMember: boolean = false

  @HostBinding('body.background-color')
  bgColor;

  constructor(private toastr: ToastsManager, vcr: ViewContainerRef, private authenticationService: AuthenticationService, private userService: UserService, public dialog: MatDialog) {
    this.bgColor = "none";
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.userService.getCurrentUser().subscribe(user => {
      this.user = user;
      console.log(this.user);
      this.pendingCards = this.user.skicards.filter(e => e.payed == false);
      this.payedCards = this.user.skicards.filter(e => e.payed == true);      
      this.calculateTurns();
      if(!this.user.member) {
        this.isNoMember = true
      }

      if(this.user.member == null) {
        this.isPendingMember = false
      } else if (this.user.member.pending) {
        this.isPendingMember = true
      }
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
        this.toastr.success('You are awesome!', 'Success!');
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
    let dialogRef = this.dialog.open(MemberAddComponent, {
      width: '500px',
      data: {
        message: "U heeft betaald!"
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.toastr.success('You are awesome!', 'Success!');
      if(result == "lid"){
        this.userService.addMember(this.user.email).subscribe(
          
        );        
      } 
    });
  }
}
