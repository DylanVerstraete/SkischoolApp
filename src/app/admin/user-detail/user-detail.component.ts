import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  detailUser: User;
  logs: any;

  constructor(private route: ActivatedRoute, private userSerivce: UserService, private adminService: AdminService) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userSerivce.getByEmail(params['email']).subscribe(data => {
        this.detailUser = data
        console.log(this.detailUser)
        this.adminService.getUserLogs(this.detailUser._id).subscribe(data => {
          this.logs = data;
          console.log(this.logs)
        })
      })
    });
  }
}
