import { Injectable, EventEmitter } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { User } from '../models/user';
import decode from 'jwt-decode';

@Injectable()
export class AuthenticationService {
    private headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
    userIsloggedIn: EventEmitter<boolean>;
    isAdmin: EventEmitter<boolean>;
    
    constructor(private http: Http) {
         this.userIsloggedIn = new EventEmitter();
         this.isAdmin = new EventEmitter();
    }
    
    login(email: string, password: string) {
      let body = new URLSearchParams();
      body.set('email', email);
      body.set('password', password);
  
        return this.http.post('http://localhost:5000/api/login',body.toString(),{headers: this.headers})
            .map((response: Response) => {
                let validCredentials: boolean = false;
                // login successful if there's a jwt token in the response
                let user = response.json();
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    validCredentials = true;
                }
                console.log(user.role);
                if(user.role == "admin"){
                    this.isAdmin.emit(true);
                    console.log(this.isAdmin);
                }else{
                    this.isAdmin.emit(false);
                }
                this.userIsloggedIn.emit(validCredentials);
                return user;
            });
    }

    logout(): Promise<boolean> {
        return new Promise(resolve => {
            localStorage.removeItem('currentUser');
            this.userIsloggedIn.emit(false);
            resolve(true);
        });
    }

    getUser(): User{
        return JSON.parse(localStorage.getItem('currentUser'));
    }

    getUserInfo(){
        let user = JSON.parse(localStorage.getItem('currentUser'));
        // decode the token to get its payload
        const tokenPayload = decode(user.token);
        return tokenPayload;
    }

    getAdmin(): User{
        let user = JSON.parse(localStorage.getItem('currentUser'));
        // decode the token to get its payload
        console.log(user);
        if(user != null){
            if(user.token){
                const tokenPayload = decode(user.token);
                if(tokenPayload.role == "admin"){
                    return user;
                }
            }
        }else{
            return undefined;
        }
        //return tokenPayload;
    }
}