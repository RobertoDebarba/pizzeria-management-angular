import {Request, Response, Router} from "express";
import {OrderDao} from "../storage/order-dao";
import {Order} from "../model/order.model";

export class OrderRouter {

    router: Router;

    constructor() {
        this.router = Router();
        this.init();
    }

    public init() {
        this.router.get('/', OrderRouter.getAll);
        this.router.get('/:id', OrderRouter.getOne);
        this.router.post('/', OrderRouter.save);
        this.router.post('/complete/:id', OrderRouter.complete);
        this.router.post('/cancel/:id', OrderRouter.cancel);
    }

    private static getAll(request: Request, response: Response) {
        new OrderDao().getAll().then((orders: Order[]) => {
            for (let order of orders) {
                order.totalPrice = OrderRouter.getTotalPrice(order);
            }

            response.status(200).send(orders)
        }).catch((error) => {
            response.status(500).send({
                message: error.message
            })
        })
    }

    private static getOne(request: Request, response: Response) {
        let orderId: number = parseInt(request.params.id);

        new OrderDao().get(orderId).then((order: Order) => {
            if (order) {
                order.totalPrice = OrderRouter.getTotalPrice(order);
                response.status(200).send(order)
            } else {
                response.status(404).send('No order found by the given id');
            }
        }).catch((error) => {
            response.status(500).send({
                message: error.message
            })
        })
    }

    private static save(request: Request, response: Response) {
        let order: Order = request.body;

        OrderDao.save(order).then(() => {
            response.status(200)
                .send(order)
        }).catch((error) => {
            response.status(500).send({
                message: error.message
            })
        })
    }

    private static complete(request: Request, response: Response) {
        OrderRouter.changeStatus(request, response, "DONE");
    }

    private static cancel(request: Request, response: Response) {
        OrderRouter.changeStatus(request, response, "CANCELED");
    }

    private static changeStatus(request: Request, response: Response, status: string) {
        let orderId: number = parseInt(request.params.id);

        OrderDao.setStatus(orderId, status).then(() => {
            response.status(200)
                .send(status)
        }).catch((error) => {
            response.status(500).send({
                message: error.message
            })
        })
    }

    private static getTotalPrice(order: Order): number {
        let totalPrice: number = 0;
        for (let orderProduct of order.products) {
            totalPrice += orderProduct.product.price * orderProduct.amount;
        }

        return totalPrice;
    }

}

const orderRouter = new OrderRouter();
orderRouter.init();

export default orderRouter.router;
