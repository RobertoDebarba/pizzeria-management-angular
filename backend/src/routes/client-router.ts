import {Router, Request, Response} from "express";
import * as fs from "fs";
import * as path from "path";

const dataFilePath:string = '../data/client';

export interface Client {
    name:string,
    cpf:number,
    phone1:number,
    phone2:number,
    address:{
        place:string,
        city:string,
        zipCode:number,
        number:number,
        neighborhood:string,
        info:string
    }
}

export class ClientRouter {

    router:Router;

    constructor() {
        this.router = Router();
        this.init();
    }

    public init() {
        this.router.get('/', this.getAll);
        this.router.get('/:cpf', this.getOne);
        this.router.post('/', this.save);
    }

    private getAll(request:Request, response:Response) {
        let clients:Client[] = require(dataFilePath);
        response.send(clients);
    }

    private getOne(request:Request, response:Response) {
        let clients:Client[] = require(dataFilePath);

        let query:number = parseInt(request.params.cpf);
        let client:Client = clients.find((client:Client) => client.cpf === query);
        if (client) {
            response.status(200)
                .send({
                    message: 'Success',
                    status: response.status,
                    client
                });
        }
        else {
            response.status(404)
                .send({
                    message: 'No client found with the given cpf.',
                    status: response.status
                });
        }
    }

    private save(request:Request, response:Response) {
        let clients:Client[] = require(dataFilePath);

        let client:Client = request.body;

        let storedClient:Client = clients.find((storedClients:Client) => storedClients.cpf == client.cpf);
        if (storedClient) {
            storedClient.name = client.name;
            storedClient.phone1 = client.phone1;
            storedClient.phone2 = client.phone2;
            storedClient.address = client.address;
        } else {
            clients.push(client);
        }

        fs.writeFile(path.join(__dirname, dataFilePath + ".json"), JSON.stringify(clients), 'UTF-8', () => {
            clients = require(dataFilePath);
            response.status(200)
                .send({
                    message: 'Success',
                    status: response.status,
                    client
                });
        })
    }

}

const clientRouter = new ClientRouter();
clientRouter.init();

export default clientRouter.router;
