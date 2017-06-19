import {Storage} from "./storage";
import {Product} from "../model/product.model";

export class ProductDao {

    public static save(product: Product): Promise<any> {
        let sql: string = `INSERT INTO PRODUCTS (NAME, PRICE) 
            VALUES ('${product.name}', '${product.price}')`;

        return Storage.executeSql(sql);
    }

    public static edit(product: Product): Promise<any> {
        let sql: string = `UPDATE PRODUCTS SET 
                NAME = '${product.name}', 
                PRICE = '${product.price}' 
            WHERE ID = ${product.id}`;

        return Storage.executeSql(sql);
    }

    public static getAll(): Promise<Product[]> {
        let sql: string = `SELECT ID 'id', NAME 'name', PRICE 'price' FROM PRODUCTS`;

        return Storage.executeSql(sql);
    }

    public static get(id: number): Promise<Product> {
        let sql: string = `SELECT ID 'id', NAME 'name', PRICE 'price' FROM PRODUCTS 
            WHERE ID = ${id}`;

        return Storage.executeSql(sql).then((products: Product[]) => {
            return products[0];
        });
    }

}