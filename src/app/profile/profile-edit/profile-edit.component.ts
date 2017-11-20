import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit {

  user: User;

  constructor(private userService: UserService, private router: Router) {
  }

  ngOnInit() {
    this.userService.getCurrentUser().subscribe(user => this.user = user);
  }

  edit(){
    console.log(this.user);
    this.userService.update(this.user).subscribe(data => {console.log(data),this.router.navigate(["/profiel"]) });  
  }
}
