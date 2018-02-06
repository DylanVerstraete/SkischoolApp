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

    addSkiCard(user: User) {
        return this.http.post('http://localhost:5000/api/cards', user.email, this.jwt()).map((response: Response) => response.json());
    }

    requestCard(user: User) {
        return this.http.post('http://localhost:5000/api/cards', { id: user._id }, this.jwt()).map((response: Response) => response.json());
    }

    addMember(email: any) {
        return this.http.post('http://localhost:5000/api/members', { email: email }, this.jwt()).map((response: Response) => response.json());
    }

    deleteMember(id: number) {
        return this.http.delete('http://localhost:5000/api/members/' + id, this.jwt()).map((response: Response) => response.json());
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

    public getJwt() {
        const { currentUser } = JSON.parse(localStorage.getItem('currentUser'))
        return currentUser.token
    }
}
