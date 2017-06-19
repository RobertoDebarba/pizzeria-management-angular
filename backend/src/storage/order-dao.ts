import {Storage} from "./storage";
import {ProductDao} from "./product-dao";
import {Order} from "../model/order.model";
import {Product} from "../model/product.model";
import {IError} from "mysql";
import * as moment from "moment";

export class OrderDao {

    public static save(order: Order): Promise<any> {
        return new Promise((resolve, reject) => {
            Storage.beginTransaction().then(() => {
                let insertPromises: Promise<any>[] = [];

                let date: string = moment(order.date).utc().format('YYYY-MM-DD HH:mm:ss');
                let insertOrderQuery: string = `INSERT INTO ORDERS (DATE, STATUS, CLIENT) 
                VALUES ('${date}', '${order.status}', '${order.client.cpf}')`;

                Storage.executeSql(insertOrderQuery).then(() => {

                    let getOrderIdQuery: string = `SELECT ID 'id'
                        FROM ORDERS
                        ORDER BY ID DESC
                        LIMIT 1`;

                    Storage.executeSql(getOrderIdQuery).then((newId: any) => {
                        for (let product of order.products) {
                            let insertProductsQuery: string = `INSERT INTO PRODUCTS_ORDERS (ID_PRODUCT, ID_ORDER, AMOUNT)
                            VALUES (${product.product.id}, ${newId[0].id}, ${product.amount})`;

                            insertPromises.push(Storage.executeSql(insertProductsQuery));
                        }

                        Promise.all(insertPromises).then(() => {
                            Storage.commit().then(() => {
                                resolve();
                            }).catch((error: IError) => {
                                Storage.rollback().then(() => {
                                    reject(error);
                                })
                            })
                        })
                    })
                })
            })
        })
    }

    public getAll(): Promise<Order[]> {
        return this.getOrders();
    }

    public get(id: number): Promise<Order> {
        return this.getOrders(id).then((orders: Order[]) => {
            return orders[0];
        });
    }

    public static setStatus(id: number, status: string): Promise<any> {
        let sql: string = `UPDATE ORDERS
            SET STATUS = '${status}'
            WHERE ID = ${id}`;

        return Storage.executeSql(sql);
    }

    private getOrders(orderId?: number): Promise<Order[]> {
        return new Promise((resolve, reject) => {
            try {
                let sql: string = `SELECT ORDERS.ID 'id', 
                        ORDERS.DATE 'date',
                        ORDERS.STATUS 'status',
                        CLIENTS.CPF 'clientCpf',
                        CLIENTS.NAME 'clientName',
                        CLIENTS.TELEPHONE 'clientPhone1',
                        CLIENTS.CELLPHONE 'clientPhone2',
                        CLIENTS.ADDRESS 'clientAddress',
                        CLIENTS.NEIGHBORHOOD 'clientNeighborhood',
                        CLIENTS.CITY 'clientCity',
                        CLIENTS.ZIPCODE 'clientZipCode',
                        CLIENTS.NUMBER 'clientNumber',
                        CLIENTS.INFO 'clientInfo'
                    FROM ORDERS
                    INNER JOIN CLIENTS ON ORDERS.CLIENT = CLIENTS.CPF`;

                if (orderId) {
                    sql += ` WHERE ORDERS.ID = ${orderId}`;
                }

                return Storage.executeSql(sql).then((selectResults: any[]) => {
                    let orders: Order[] = [];
                    let getProductPromises: Promise<any>[] = [];

                    for (let selectResult of selectResults) {
                        let order: Order = {
                            id: selectResult.id,
                            date: selectResult.date,
                            status: selectResult.status,
                            client: {
                                name: selectResult.clientName,
                                cpf: selectResult.clientCpf,
                                phone1: selectResult.clientPhone1,
                                phone2: selectResult.clientPhone2,
                                address: {
                                    place: selectResult.clientAddress,
                                    city: selectResult.clientCity,
                                    zipCode: selectResult.clientZipCode,
                                    number: selectResult.clientNumber,
                                    neighborhood: selectResult.clientNeighborhood,
                                    info: selectResult.clientInfo
                                }
                            },
                            products: [],
                            totalPrice: null
                        };

                        getProductPromises.push(this.getProductsFromOrder(order).then((orderProducts: any) => {
                            order.products = orderProducts;

                            orders.push(order);
                        }).catch((e) => {
                            reject(e);
                        }))
                    }

                    Promise.all(getProductPromises).then(() => {
                        resolve(orders);
                    })
                }).catch((e) => {
                    reject(e);
                })

            } catch (e) {
                reject(e);
            }
        })
    }

    private getProductsFromOrder(order: Order) {
        return new Promise((resolve, reject) => {
            let productsQuery: string = `SELECT 
                    PRODUCTS_ORDERS.ID_PRODUCT 'productId', 
                    PRODUCTS_ORDERS.AMOUNT 'amount'
                FROM PRODUCTS_ORDERS
                WHERE PRODUCTS_ORDERS.ID_ORDER = ${order.id}`;

            Storage.executeSql(productsQuery).then((productOrdersStored: any[]) => {
                let orderProducts: any[] = [];
                let getProductPromises: Promise<any>[] = [];

                for (let productOrderStored of productOrdersStored) {
                    getProductPromises.push(ProductDao.get(productOrderStored.productId).then((product: Product) => {
                        orderProducts.push({
                            product: product,
                            amount: productOrderStored.amount
                        })
                    }))
                }

                Promise.all(getProductPromises).then(() => {
                    resolve(orderProducts);
                })
            }).catch((e) => {
                reject(e);
            })
        })
    }

}