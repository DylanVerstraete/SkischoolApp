import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '../services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None  
})
export class LoginComponent implements OnDestroy, OnInit {

  error: string;
  model: any = {};
  loading = false;
  returnUrl: string;

  constructor(private http:HttpClient,
      private authenticationService: AuthenticationService,
      private router: Router,private route: ActivatedRoute,) {}

  ngOnInit(): void {
    document.querySelector('body').classList.add('blue');    
    // reset login status
    this.authenticationService.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  ngOnDestroy(): void {
    document.querySelector('body').classList.remove('blue');
  } 

  private onLoginSuccesFull(){

  }

  login() {
    this.loading = true;
    
    this.authenticationService.login(this.model.email, this.model.password).subscribe(data => {
      this.router.navigate([this.returnUrl]);
    }, error => {
      this.error = "Combinatie email - paswoord is niet correct";
      this.loading = false;
    });
  }
}
