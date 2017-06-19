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

        let corsMiddleware = express.Router();

        corsMiddleware.use(function (req, res, next) {

            // Website you wish to allow to connect
            res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

            // Request methods you wish to allow
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

            // Request headers you wish to allow
            res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Methods,Authorization,Access-Control-Allow-Headers,Access-Control-Allow-Origin,X-Requested-With,content-type,X-Auth-Token');

            if ('OPTIONS' == req.method) {
                res.send(200);
            } else {
                next();
            }

            // Set to true if you need the website to include cookies in the requests sent
            // to the API (e.g. in case you use sessions)
            // res.setHeader('Access-Control-Allow-Credentials', true);

            // Pass to next layer of middleware
            // next();
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

        this.express.use('/', corsMiddleware, router);
        this.express.use('/api/client', corsMiddleware, authMiddleware, ClientRouter);
        this.express.use('/api/order', corsMiddleware, authMiddleware, OrderRouter);
        this.express.use('/api/product', corsMiddleware, authMiddleware, ProductRouter);
        this.express.use('/api/login', corsMiddleware, LoginRouter);
        this.express.use('/api/token', corsMiddleware, TokenRouter);
    }

}

export default new App().express;
