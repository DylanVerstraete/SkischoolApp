import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { User } from '../models/user';
import { MatTableDataSource } from '@angular/material';
import { MatTableModule } from '@angular/material/table';
import { SkiCard } from '../models/skicard';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  displayedColumns = ['email', 'memberadd', 'skicards', 'skicardsadd'];
  users: User[];
  dataSource = new MatTableDataSource<User>(this.users);
  
  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.adminService.getAllUser().subscribe(data => {
      this.users = data;
      console.log(data);
      this.dataSource = new MatTableDataSource<User>(this.users);
    });
  }

  addCard(id: number){
    this.adminService.markPayed(id).subscribe(data => {
      this.refresh();
    });
  }

  addMember(id: number){
    this.adminService.addMember(id).subscribe(data => {
      console.log(data);
      this.refresh();
    });
  }

  refresh(){
    this.adminService.getAllUser().subscribe(data => {
      this.users = data;
      console.log(data);
      this.dataSource = new MatTableDataSource<User>(this.users);
    });
  }

  decreaseTurn(value: number, id: number){
    //console.log(value, id);
    var _turn;
    var user = this.users.filter(e => e._id == id);
    var skicard = user[0].skicards.filter(z => z.turns.length > 0);
    console.log(skicard[2].turns[0]);
    var turn = skicard[2].turns.filter(g => g.used == false);
    console.log(turn[0]);
    //console.log(user);
    //console.log(user[0].skicards[0].turns[0]);
    var restingMinutes = user[0].skicards[0].turns[0].minutes - value;
    //console.log(restingMinutes);
    turn[0].minutes = restingMinutes;
    console.log(turn[0]);
    this.adminService.editTurn(turn[0]._id).subscribe(data => console.log(data));
    
  }
}

interface UserInfo {
  email: String;
  member: Boolean;
  skicards: SkiCard[];
  pendingSkicards: SkiCard[];
}


