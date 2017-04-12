import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Rx";
import {Http} from "@angular/http";


export interface Order {

}

@Injectable()
export class OrderService {

    constructor(private http: Http) {
    }

    public getOrders(): Observable<Order> {
        return this.http.get('');
    }

}
