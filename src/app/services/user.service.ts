import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { User } from '../../app/models/user';

@Injectable()
export class UserService {
    private headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });

    constructor(private http: Http) { }


    getAll() {
        return this.http.get('http://localhost:5000/api/users', this.jwt()).map((response: Response) => response.json());
    }


    getByEmail(id: number) {
        return this.http.get('http://localhost:5000/api/users' + id, this.jwt()).map((response: Response) => response.json());
    }


    getCurrentUser() {
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        return this.http.get("http://localhost:5000/api/users/" + currentUser.email, this.jwt()).map((response: Response) => response.json());
    }

    create(user: User) {
        return this.http.post('http://localhost:5000/api/signup', user, this.jwt()).map((response: Response) => response.json());
    }

    update(user: User) {
        return this.http.post('http://localhost:5000/api/users/edit/' + user.email, user, this.jwt()).map((response: Response) => response.json());
    }

    delete(id: number) {
        return this.http.delete('http://localhost:5000/api/users' + id, this.jwt()).map((response: Response) => response.json());
    }

    requestSecretRoute() {
        return this.http.get('http://localhost:5000/api/secret', this.jwt()).map((response: Response) => response.json());
    }

    addSkiCard(user: User) {
        return this.http.post('http://localhost:5000/api/users/addCard', user, this.jwt()).map((response: Response) => response.json());
    }

    requestCard(user: User) {
        return this.http.post('http://localhost:5000/api/users/requestCard', user, this.jwt()).map((response: Response) => response.json());
    }

    makeMember(user: User) {
        return this.http.post('http://localhost:5000/api/add/pendingMember', user, this.jwt()).map((response: Response) => response.json());
    }

    undoMember(user: User) {
        return this.http.post('http://localhost:5000/api/delete/member', user, this.jwt()).map((response: Response) => response.json());
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
