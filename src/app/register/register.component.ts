import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { matchOtherValidator } from './matchothervalidator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RegisterComponent implements OnInit, OnDestroy {

  model: any = {};
  loading = false;

  registerForm: FormGroup;

  constructor(private router: Router, private userService: UserService, private fb: FormBuilder) { }

  ngOnInit() {
    document.querySelector('body').classList.add('blue'); 
    document.querySelector("nav").classList.add('blue');     
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.minLength(3), Validators.pattern('[a-z0-9._%+-]+@[a-z0-9]+\\.[a-z]{2,3}')]],
      lastname: ['', [Validators.required, Validators.minLength(3)]],
      firstname: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(3)]],
      passwordConfirm: ['', [Validators.required, Validators.minLength(3), matchOtherValidator('password')]],
    });
  }

  register() {
    if(this.registerForm.valid){
      console.log("TEST");
      this.loading = true;

      this.model = {
        password: this.registerForm.get('password').value,
        firstName: this.registerForm.get('firstname').value,
        lastName: this.registerForm.get('lastname').value,
        email: this.registerForm.get('email').value
      };

      this.userService.create(this.model).subscribe(data => {
        this.router.navigate(['/login']);
      }, error => {
        this.loading = false;
      });
    }else{
      console.log("not valid");
    }
    
  }

  ngOnDestroy(): void {
    document.querySelector('body').classList.remove('blue');
    document.querySelector("nav").classList.remove('blue'); 
  } 
}
