import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {Http, RequestOptions, Headers} from "@angular/http";

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';

interface Login{
    successful:boolean,
    token:string
}

@Injectable()
export class AuthService {
    constructor(private http: Http, private router: Router) {}

    login(username: string, password: string): Observable<Login> {
        //Chamar Backend
        // return this.http.post('http://localhost:3000/login/', {username, password}, this.getHeaders())
        //         .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
        return Observable.of({ successful:true, token: 'OK'} as Login);
    }

    private getHeaders(): RequestOptions{
        let options = new RequestOptions();
        options.headers = new Headers();
        options.headers.set('Access-Control-Allow-Origin', '*');
        options.headers.set('Access-Control-Allow-Methods', ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS']);
        options.headers.set('Access-Control-Allow-Headers', ['Origin', 'Content-Type', 'X-Auth-Token']);
        options.headers.set('Content-Type', 'application/json');
        return options;
    }
}