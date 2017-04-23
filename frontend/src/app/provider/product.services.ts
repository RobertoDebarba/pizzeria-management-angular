import { Response } from 'express';
import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Rx";
import {Http, RequestOptions, Headers} from "@angular/http";


export interface Product {
    id: number,
    name: string,
    price: number
}

@Injectable()
export class ProductService {
    constructor(private http: Http) {
        this.atualizaProducts();
    }

    public getProducts(): Observable<Product[]> {
        return products;
    }

    private atualizaProducts() {
        let options = new RequestOptions();
        options.headers = new Headers();
        options.headers.set('Access-Control-Allow-Origin', '*');
        options.headers.set('Access-Control-Allow-Methods', ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS']);
        options.headers.set('Access-Control-Allow-Headers', ['Origin', 'Content-Type', 'X-Auth-Token']);

        products = this.http.get('http://192.168.0.24:3000/api/product/', options)
                .map((res:Response) => {
                    let o = res.json();
                    console.log(o);
                    return o;
                })
                .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }
}
var products:Observable<Product[]>;
