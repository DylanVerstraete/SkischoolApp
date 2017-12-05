import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { User } from '../models/user';
import { MatTableDataSource } from '@angular/material';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  displayedColumns = ['email', 'member', 'memberadd', 'skicards', 'skicardsadd'];
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
    this.adminService.addCardToUserWithId(id).subscribe(data => {
      console.log(data);
      this.refresh();
    });
  }

  addMember(user: User){
    this.adminService.addMember(user).subscribe(data => {
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
}


