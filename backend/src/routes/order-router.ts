import {Router, Request, Response} from "express";
import * as fs from "fs";
import * as path from "path";
import {Product} from "./product-router";
import {Client} from "./client-router";

const dataFilePath:string = '../data/order';
const productDataFilePath:string = '../data/product';
const clientDataFilePath:string = '../data/client';

interface OrderStorage {
    id:number,
    date:string,
    status:string,
    client:number,
    products:{
        id:number,
        amount:number
    }[]
}

interface Order {
    id:number,
    date:string,
    status:string,
    client:Client,
    products:{
        product:Product,
        amount:number
    }[],
    totalPrice:number
}

export class OrderRouter {

    router:Router;

    constructor() {
        this.router = Router();
        this.init();
    }

    public init() {
        this.router.get('/', this.getAll);
        this.router.get('/:id', this.getOne);
        this.router.post('/', this.save);
        this.router.post('/complete/:id', this.complete);
        this.router.post('/cancel/:id', this.cancel);
    }

    private getAll(request:Request, response:Response) {
        let ordersStored:OrderStorage[] = require(dataFilePath);
        let products:Product[] = require(productDataFilePath);
        let clients:Client[] = require(clientDataFilePath);

        response.send(OrderRouter.buildOrders(ordersStored, clients, products));
    }

    private getOne(request:Request, response:Response) {
        let orders:OrderStorage[] = require(dataFilePath);

        let query:number = parseInt(request.params.id);
        let order:OrderStorage = orders.find((order:OrderStorage) => order.id == query);
        if (order) {
            let products:Product[] = require(productDataFilePath);
            let clients:Client[] = require(clientDataFilePath);

            // Aqui eu poderia usar o objeto order, porém por algum motivo sobrenatural que não aconteceria no Java, ele fica undefined após entrar no IF
            let order:Order = OrderRouter.buildOrders([orders.find((order:OrderStorage) => order.id == query)], clients, products)[0];

            response.status(200)
                .send({
                    message: 'Success',
                    status: response.status,
                    order
                });
        } else {
            response.status(404)
                .send({
                    message: 'No order found with the given id.',
                    status: response.status
                });
        }
    }

    private save(request:Request, response:Response) {
        let orders:OrderStorage[] = require(dataFilePath);

        let order:OrderStorage = request.body;
        order.id = orders[orders.length - 1].id + 1;

        orders.push(order);
        fs.writeFile(path.join(__dirname, dataFilePath + ".json"), JSON.stringify(orders), 'UTF-8', () => {
            orders = require(dataFilePath);
            response.status(200)
                .send({
                    message: 'Success',
                    status: response.status,
                    order
                });
        })
    }

    private complete(request:Request, response:Response) {
        OrderRouter.changeStatus(request, response, "DONE");
    }

    private cancel(request:Request, response:Response) {
        OrderRouter.changeStatus(request, response, "CANCELED");
    }

    private static changeStatus(request:Request, response:Response, status:string) {
        let orders:OrderStorage[] = require(dataFilePath);

        let query:number = parseInt(request.params.id);
        let order:OrderStorage = orders.find((order:OrderStorage) => order.id == query);
        if (order) {
            order.status = status;
            fs.writeFile(path.join(__dirname, dataFilePath + ".json"), JSON.stringify(orders), 'UTF-8', () => {
                orders = require(dataFilePath);
                response.status(200)
                    .send({
                        message: 'Success',
                        status: response.status
                    });
            })
        } else {
            response.status(404)
                .send({
                    message: 'No order found with the given id.',
                    status: response.status
                });
        }
    }

    private static buildOrders(ordersStored:OrderStorage[], clients:Client[], products:Product[]):Order[] {
        let orders:Order[] = [];
        for (let orderStored of ordersStored) {
            let order:Order = <Order>{};
            order.id = orderStored.id;
            order.date = orderStored.date;
            order.status = orderStored.status;
            order.client = clients.find((client:Client) => client.cpf == orderStored.client);
            order.totalPrice = OrderRouter.getTotalPrice(orderStored, products);
            order.products = [];

            for (let orderProduct of orderStored.products) {
                var product = products.find((product:Product) => product.id == orderProduct.id);
                order.products.push({
                    product: product,
                    amount: orderProduct.amount
                })
            }

            orders.push(order);
        }
        return orders;
    }

    private static getTotalPrice(order:OrderStorage, products:Product[]):number {
        let totalPrice:number = 0;
        for (let orderProduct of order.products) {
            let product = products.find((product) => product.id == orderProduct.id);
            totalPrice += product.price * orderProduct.amount;
        }

        return totalPrice;
    }

}

const orderRouter = new OrderRouter();
orderRouter.init();

export default orderRouter.router;
