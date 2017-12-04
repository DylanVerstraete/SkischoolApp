import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '../services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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
  loginForm: FormGroup;

  constructor(private http:HttpClient,
      private authenticationService: AuthenticationService,
      private router: Router,private route: ActivatedRoute,
      private fb: FormBuilder) {}

  ngOnInit(): void {
    document.querySelector("nav").classList.add('blue'); 
    document.querySelector('body').classList.add('blue');    
    // reset login status
    this.authenticationService.logout();

    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  ngOnDestroy(): void {
    document.querySelector('body').classList.remove('blue');
    document.querySelector("nav").classList.remove('blue');     
  } 

  private onLoginSuccesFull(){

  }

  login() {
    if(this.loginForm.valid){
      this.model = {
        password: this.loginForm.get('password').value,
        email: this.loginForm.get('email').value
      };
      this.authenticationService.login(this.model.email, this.model.password).subscribe(data => {
        this.router.navigate([this.returnUrl]);
      }, error => {
        this.error = "Combinatie email - paswoord is niet correct";
        this.loading = false;
      });
    }else{
      console.log("not valid");
    }
  }
}
