import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Rx";


export interface Product {
    id: number,
    name: string,
    price: number
}

export class ProductService {
    constructor() {
    }

    public getProducts(): Observable<Product[]> {
        return null;
    }
}