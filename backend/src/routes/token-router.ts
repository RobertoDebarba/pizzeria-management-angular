import {Router, Request, Response} from "express";
let jwt = require('jsonwebtoken');

export class TokenRouter {

    router: Router;

    constructor() {
        this.router = Router();
        this.init();
    }

    public init() {
        this.router.get('/validate/:token', TokenRouter.validateToken);
    }

    private static validateToken(request: Request, response: Response) {
        try {
            jwt.verify(request.params.token, 'ITATAKARU');

            response.status(200)
                .send({
                    status: response.status,
                    logged: true
                });
        } catch (err) {
            response.status(200)
                .send({
                    status: response.status,
                    logged: false
                });
        }
    }
}

const tokenRouter = new TokenRouter();
tokenRouter.init();

export default tokenRouter.router;