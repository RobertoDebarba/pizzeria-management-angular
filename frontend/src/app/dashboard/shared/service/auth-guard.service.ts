import { Injectable }     from '@angular/core';
import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot, Router } from '@angular/router';
import {Http, RequestOptions, Headers} from "@angular/http";
import { Response } from 'express';
import {Observable} from "rxjs/Rx";
import {AuthService} from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private http: Http, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        let url: string = state.url;

        return this.checkLogin(url);
    }

    checkLogin(url: string): Observable<boolean> {
        if(localStorage.getItem('ITATAKARU')){
            return Observable.of(true);
            //TODO VALIDAR SE O TOKEN É VALIDO
            // return this.http.get('http://localhost:3000/token/validate/'+ localStorage.getItem('ITATAKARU'), this.getHeaders())
            //         .map((res:Response) => {
            //             var logged: boolean = res.json().logged;
            //             if (!logged) this.router.navigate(['/login']);
            //             return logged;
            //         });
        }
        this.router.navigate(['/login']);
        return Observable.of(false);
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