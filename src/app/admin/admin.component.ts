import { Component, OnInit, ViewChild } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { User } from '../models/user';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { MatTableModule } from '@angular/material/table';
import { SkiCard } from '../models/skicard';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  displayedColumns = ['email', 'memberadd', 'skicards', 'skicardsadd'];
  users: User[];
  dataSource = new MatTableDataSource<User>(this.users);
  
  constructor(private adminService: AdminService, private router: Router) { }
  
  @ViewChild(MatSort) sort: MatSort;

  /**
   * Set the sort after the view init since this component will
   * be able to query its view for the initialized sort.
   */
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
  
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
    var _turn;
    var user = this.users.filter(e => e._id == id);
    var skicard = user[0].skicards.filter(z => z.turns.length > 0);
    var turn = skicard[2].turns.filter(g => g.used == false);
    var restingMinutes = user[0].skicards[0].turns[0].minutes - value;
    turn[0].minutes = restingMinutes;
    this.adminService.editTurn(turn[0]._id).subscribe(data => console.log(data));   
  }

  detail (email: string) {
    this.router.navigate(['admin/userDetail', email])
  }
}

interface UserInfo {
  email: String;
  member: Boolean;
  skicards: SkiCard[];
  pendingSkicards: SkiCard[];
}


