import {Request, Response, Router} from "express";
import {User} from "../model/user.model";
import {UserDao} from "../storage/user-dao";
import {IError} from "mysql";
let jwt = require('jsonwebtoken');

export interface Login {
    successful: boolean,
    token: string
}

export class LoginRouter {

    router: Router;

    constructor() {
        this.router = Router();
        this.init();
    }

    public init() {
        this.router.post('/', LoginRouter.getUser);
    }

    private static getUser(request: Request, response: Response) {
        let username: string = request.body.username;
        let password: string = request.body.password;

        UserDao.get(username, password).then((user: User) => {
            if (user) {
                response.status(200)
                    .send({
                        token: jwt.sign(user, 'ITATAKARU', {expiresIn: 1800})
                    });
            } else {
                response.status(401).send();
            }
        }).catch((error: IError) => {
            response.status(500).send({
                message: error.message
            })
        });
    }
}

const loginRouter = new LoginRouter();
loginRouter.init();

export default loginRouter.router;