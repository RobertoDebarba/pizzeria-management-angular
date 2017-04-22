import {Router, Request, Response} from "express";
import * as fs from "fs";
import * as path from "path";

const dataFilePath:string = '../data/product';

export interface Product {
    id:number,
    name:string,
    price:number
}

export class ProductRouter {

    router:Router;

    constructor() {
        this.router = Router();
        this.init();
    }

    public init() {
        this.router.get('/', this.getAll);
        this.router.get('/:id', this.getOne);
        this.router.delete('/:id', this.delete);
        this.router.post('/', this.save);
    }

    private getAll(request:Request, response:Response) {
        let products:Product[] = require(dataFilePath);
        response.send(products);
    }

    private getOne(request:Request, response:Response) {
        let products:Product[] = require(dataFilePath);

        let query:number = parseInt(request.params.id);
        let product:Product = products.find((product:Product) => product.id === query);
        if (product) {
            response.status(200)
                .send({
                    message: 'Success',
                    status: response.status,
                    product
                });
        }
        else {
            response.status(404)
                .send({
                    message: 'No product found with the given id.',
                    status: response.status
                });
        }
    }

    private save(request:Request, response:Response) {
        let products:Product[] = require(dataFilePath);

        let product:Product = request.body;

        let storedProducts:Product = products.find((storedProducts:Product) => storedProducts.id == product.id);
        if (storedProducts) {
            storedProducts.id = product.id;
            storedProducts.name = product.name;
            storedProducts.price = product.price;
        } else {
            products.push(product);
        }

        fs.writeFile(path.join(__dirname, dataFilePath + ".json"), JSON.stringify(products), 'UTF-8', () => {
            products = require(dataFilePath);
            response.status(200)
                .send({
                    message: 'Success',
                    status: response.status,
                    product
                });
        })
    }

    private delete(request:Request, response:Response) {
        let products:Product[] = require(dataFilePath);

        let query:number = parseInt(request.params.id);

        let storedProduct:Product = products.find((storedProducts:Product) => storedProducts.id == query);
        if (storedProduct) {
            products.splice(products.indexOf(storedProduct), 1);

            fs.writeFile(path.join(__dirname, dataFilePath + ".json"), JSON.stringify(products), 'UTF-8', () => {
                products = require(dataFilePath);
                response.status(200)
                    .send({
                        message: 'Success',
                        status: response.status
                    });
            })
        } else {
            response.status(404)
                .send({
                    message: 'No product found with the given id.',
                    status: response.status
                });
        }
    }

}

const productRouter = new ProductRouter();
productRouter.init();

export default productRouter.router;
