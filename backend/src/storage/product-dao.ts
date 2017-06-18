import {Storage} from "./storage";
import {Product} from "../model/product.model";

export class ProductDao {

    public static save(product: Product): Promise<any> {
        let sql: string = `INSERT INTO PRODUCTS (NAME, PRICE) 
            VALUES ('${product.name}', '${product.price}')`;

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

    public static delete(id: number): Promise<any> {
        let sql: string = `DELETE FROM PRODUCTS 
            WHERE ID = ${id}`;

        return Storage.executeSql(sql);
    }

}