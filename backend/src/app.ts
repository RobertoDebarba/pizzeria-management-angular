import * as express from "express";
import * as logger from "morgan";
import * as bodyParser from "body-parser";
import ClientRouter from "./routes/client-router";
import OrderRouter from "./routes/order-router";
import ProductRouter from "./routes/product-router";
import LoginRouter from "./routes/login-router";
import TokenRouter from "./routes/token-router";
let jwt = require('jsonwebtoken');

class App {

    public express: express.Application;

    constructor() {
        this.express = express();
        this.middleware();
        this.routes();
    }

    private middleware(): void {
        this.express.use(logger('dev'));
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({extended: false}));
    }

    private routes(): void {
        let router = express.Router();

        router.get('/', (req, res, next) => {
            res.json({
                message: 'Hello World!'
            });
        });

        let authMiddleware = express.Router();

        authMiddleware.use((req, res, next) => {
            let token: string = req.headers['authorization'];
            if (token) {
                jwt.verify(token, 'ITATAKARU', function (err, decoded) {
                    if (err) {
                        return res.status(401).send({
                            message: 'Invalid token.'
                        });
                    } else {
                        next();
                    }
                })
            } else {
                return res.status(403).send({
                    message: 'No token provided.'
                })
            }
        });

        this.express.use('/', router);
        this.express.use('/api/client', authMiddleware, ClientRouter);
        this.express.use('/api/order', authMiddleware, OrderRouter);
        this.express.use('/api/product', authMiddleware, ProductRouter);
        this.express.use('/api/login', LoginRouter);
        this.express.use('/api/token', TokenRouter);
    }

}

export default new App().express;
