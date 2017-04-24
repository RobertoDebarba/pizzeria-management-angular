import { Product } from './product.services';
import { Client } from './client.services';
import { Response } from 'express';
import { Order } from './order.service';
import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Rx";
import {Http, RequestOptions, Headers} from "@angular/http";


export interface OrderStorage {
    id:number,
    date:string,
    status:string,
    client:number,
    products:{
        id:number,
        amount:number
    }[]
}

export interface Order {
    id:number,
    date:string,
    status:string,
    client:Client,
    products:Product[],
    totalPrice:number
}

@Injectable()
export class OrderService {
    constructor(private http: Http) {
        this.atualizaOrders();
    }

    public getOrders(): Observable<Order[]> {
        return orders;
    }

    public getOrder(id:number): Observable<Order> {
        return this.http.get('http://localhost:3000/api/order/' + id, this.getHeaders())
                .map((res:Response) => res.json())
                .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    private atualizaOrders() {
        orders = this.http.get('http://localhost:3000/api/order/', this.getHeaders())
                .map((res:Response) => res.json())
                .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    private getHeaders(): RequestOptions{
        let options = new RequestOptions();
        options.headers = new Headers();
        options.headers.set('Access-Control-Allow-Origin', '*');
        options.headers.set('Access-Control-Allow-Methods', ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS']);
        options.headers.set('Access-Control-Allow-Headers', ['Origin', 'Content-Type', 'X-Auth-Token']);
        return options;
    }
}
var orders:Observable<Order[]>;
