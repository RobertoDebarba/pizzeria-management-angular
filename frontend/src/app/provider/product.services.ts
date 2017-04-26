import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Rx";
import { Response } from 'express';
import {Http, RequestOptions, Headers} from "@angular/http";

export interface Product {
    id: number,
    name: string,
    price: number
}

@Injectable()
export class ProductService {
    constructor(private http: Http) {
    }

    public getProducts(): Observable<Product[]> {
        return this.http.get('http://localhost:3000/api/product/', this.getHeaders())
                .map((res:Response) => res.json())
                .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    public excluir(id : number){
        this.http.delete('http://localhost:3000/api/product/' + id, this.getHeaders())
                .catch((error: any) => Observable.throw(error.json().error || 'Server error'))
                .subscribe();
    }

    public salvar(prod:Product){
        this.http.post('http://localhost:3000/api/product/', prod , this.getHeaders())
                .catch((error: any) => Observable.throw(error.json().error || 'Server error'))
                .subscribe();
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