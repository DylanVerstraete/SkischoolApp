import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

@Injectable()
export class AdminService {
  constructor(private http: Http) { }
  
    getAllUser() {
      return this.http.get('http://127.0.0.1:5000/api/users' , this.jwt()).map((response: Response) => response.json());
    }
    // private helper methods
  
    private jwt() {
      // create authorization header with jwt token
      let currentUser = JSON.parse(localStorage.getItem('currentUser'));
      if (currentUser && currentUser.token) {
        let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
        return new RequestOptions({ headers: headers });
      }
    }
}
