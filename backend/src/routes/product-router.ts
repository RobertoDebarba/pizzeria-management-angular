import {Request, Response, Router} from "express";
import {ProductDao} from "../storage/product-dao";
import {Product} from "../model/product.model";

export class ProductRouter {

    router: Router;

    constructor() {
        this.router = Router();
        this.init();
    }

    public init() {
        this.router.get('/', ProductRouter.getAll);
        this.router.get('/:id', ProductRouter.getOne);
        this.router.delete('/:id', ProductRouter.delete);
        this.router.post('/', ProductRouter.save);
    }

    private static getAll(request: Request, response: Response) {
        ProductDao.getAll().then((products: Product[]) => {
            response.status(200)
                .send(products)
        }).catch((error) => {
            response.status(500).send({
                message: error.message
            })
        })
    }

    private static getOne(request: Request, response: Response) {
        let productId: number = parseInt(request.params.id);

        ProductDao.get(productId).then((product: Product) => {
            if (product) {
                response.status(200).send(product);
            } else {
                response.status(404).send('No product found by the given id');
            }
        }).catch((error) => {
            response.status(500).send({
                message: error.message
            })
        })
    }

    private static save(request: Request, response: Response) {
        ProductDao.save(request.body).then(() => {
            response.status(200)
                .send(request.body)
        }).catch((error) => {
            response.status(500).send({
                message: error.message
            })
        })
    }

    private static delete(request: Request, response: Response) {
        let productId: number = parseInt(request.params.id);

        ProductDao.delete(productId).then(() => {
            response.status(200)
                .send(request.body)
        }).catch((error) => {
            response.status(500).send({
                message: error.message
            })
        })
    }

}

const productRouter = new ProductRouter();
productRouter.init();

export default productRouter.router;
