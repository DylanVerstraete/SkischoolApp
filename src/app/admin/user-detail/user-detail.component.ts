import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  detailUser: User;

  constructor(private route: ActivatedRoute, private userSerivce: UserService) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userSerivce.getByEmail(params['email']).subscribe(data => {
        this.detailUser = data
      })
    });
  }
}
