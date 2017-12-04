import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { User } from '../models/user';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  users: User[];
  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.adminService.getAllUser().subscribe(data => {
      this.users = data;
      console.log(data);
    });
  }

}
