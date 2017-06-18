import {Router, Request, Response} from "express";
import {ClientDao} from "../storage/client-dao";
import {Client} from "../model/client.model";

export class ClientRouter {

    router: Router;

    constructor() {
        this.router = Router();
        this.init();
    }

    public init() {
        this.router.get('/', ClientRouter.getAll);
        this.router.get('/:cpf', ClientRouter.getOne);
        this.router.post('/', ClientRouter.save);
    }

    private static getAll(request: Request, response: Response) {
        ClientDao.getAll().then((clients: Client[]) => {
            response.status(200).send(clients);
        }).catch((error) => {
            response.status(500).send({
                message: error.message
            })
        })
    }

    private static getOne(request: Request, response: Response) {
        let cpf: string = request.params.cpf;

        ClientDao.get(cpf).then((client: Client) => {
            if (client) {
                response.status(200).send(client);
            } else {
                response.status(404).send('No client found by the given cpf');
            }
        }).catch((error) => {
            response.status(500).send({
                message: error.message
            })
        })
    }

    private static save(request: Request, response: Response) {
        let client: Client = request.body;

        ClientDao.save(client).then(() => {
            response.status(200)
                .send(client)
        }).catch((error) => {
            response.status(500).send({
                message: error.message
            })
        })
    }

}

const clientRouter = new ClientRouter();
clientRouter.init();

export default clientRouter.router;
