import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { User } from '../models/user';

@Injectable()
export class AdminService {
  
  constructor(private http: Http) { }
  
    getAllUser() {
      return this.http.get('http://localhost:5000/api/users/' , this.jwt()).map((response: Response) => response.json());
    }

    addCardToUserWithId(id: number){
      return this.http.post('http://localhost:5000/api/users/addCard/' + id , this.jwt()).map((response: Response) => response.json());
    }

    addMember(user: User){
      return this.http.post('http://localhost:5000/api/add/member/', user , this.jwt()).map((response: Response) => response.json());
    }

    editTurn(turn: any){
      return this.http.post('http://localhost:5000/api/editTurn/' , turn , this.jwt()).map((response: Response) => response.json());
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
