import {Router, Request, Response} from "express";
let jwt = require('jsonwebtoken');

const dataFilePath:string = '../data/user';

export interface User {
    id:number,
    name:string,
    password:string
}

export interface Login {
    successful:boolean,
    token:string
}

export class LoginRouter {

    router:Router;

    constructor(){
        this.router = Router();
        this.init();
    }

    public init(){
        this.router.post('/', this.getUser);
    }

    private getUser(request:Request, response:Response){
        let users:User[] = require(dataFilePath);

        let queryUser:string = request.body.username;
        let queryPassword:string = request.body.password;

        let user:User = users.find((user:User) => user.name === queryUser && user.password === queryPassword);

        if(user){
            response.status(200)
                .send({
                    status: response.status,
                    successful: true,
                    token: jwt.sign(user, 'ITATAKARU', {expiresIn: 1800})
                });
        }
        else {
            response.status(200)
                .send({
                    status: response.status,
                    successful: false,
                    token: ''
                });
        }
    }
}

const loginRouter = new LoginRouter();
loginRouter.init();

export default loginRouter.router;