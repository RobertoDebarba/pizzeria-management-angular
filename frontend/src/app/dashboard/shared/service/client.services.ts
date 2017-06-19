import { Response } from 'express';
import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Rx";
import {Http, RequestOptions, Headers} from "@angular/http";


export interface Client {
    name:string,
    cpf:string,
    phone1:string,
    phone2:string,
    address:{
        place:string,
        city:string,
        zipCode:string,
        number:number,
        neighborhood:string,
        info:string
    }
}

@Injectable()
export class ClientService {
    constructor(private http: Http) {
    }

    public getClients(): Observable<Client[]> {
        return this.http.get('http://localhost:3000/api/client/', this.getHeaders())
                .map((res:Response) => res.json())
                .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    public salvar(cli:Client): Observable<any>{
        return this.http.post('http://localhost:3000/api/client/', cli , this.getHeaders())
                .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    public editar(cli:Client): Observable<any>{
        return this.http.put('http://localhost:3000/api/client/', cli , this.getHeaders())
                .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    private getHeaders(): RequestOptions{
        let options = new RequestOptions();
        options.headers = new Headers();
        options.headers.set('Access-Control-Allow-Origin', '*');
        options.headers.set('Access-Control-Allow-Methods', ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS']);
        options.headers.set('Access-Control-Allow-Headers', ['Origin', 'Content-Type', 'X-Auth-Token']);
        options.headers.set('Content-Type', 'application/json');

        let token: string = localStorage.getItem('ITATAKARU');
        if (token) {
            options.headers.append("Authorization", token);
        }

        return options;
    }

}
