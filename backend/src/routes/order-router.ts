import {Router, Request, Response} from "express";
import * as fs from "fs";
import * as path from "path";
import {Product} from "./product-router";

const dataFilePath:string = '../data/order';
const productDataFilePath:string = '../data/product';

interface Order {
    id:number,
    date:string,
    status:string,
    client:number,
    products:{
        id:number,
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
    }

    private getAll(request:Request, response:Response) {
        let orders:Order[] = require(dataFilePath);
        orders = OrderRouter.calculateTotalPrice(orders);

        response.send(orders);
    }

    private getOne(request:Request, response:Response) {
        let orders:Order[] = require(dataFilePath);

        let query:number = parseInt(request.params.id);
        let order:Order = orders.find((client:Order) => client.id === query);
        if (order) {
            order = OrderRouter.calculateTotalPrice([order])[0];

            response.status(200)
                .send({
                    message: 'Success',
                    status: response.status,
                    order
                });
        }
        else {
            response.status(404)
                .send({
                    message: 'No order found with the given id.',
                    status: response.status
                });
        }
    }

    private save(request:Request, response:Response) {
        let orders:Order[] = require(dataFilePath);

        let order:Order = request.body;

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

    private static calculateTotalPrice(orders:Order[]):Order[] {
        let products:Product[] = require(productDataFilePath);
        let totalPrice:number = 0;
        for (let order of orders) {
            for (let orderProduct of order.products) {
                let product = products.find((product) => product.id == orderProduct.id);
                totalPrice += product.price;
            }

            order.totalPrice = totalPrice;
        }

        return orders;
    }

}

const orderRouter = new OrderRouter();
orderRouter.init();

export default orderRouter.router;
