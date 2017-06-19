import {Storage} from "./storage";
import {Client} from "../model/client.model";

export class ClientDao {

    public static save(client: Client): Promise<any> {
        let sql: string = `INSERT INTO CLIENTS (
                CPF, 
                NAME, 
                TELEPHONE, 
                CELLPHONE, 
                ADDRESS, 
                NEIGHBORHOOD, 
                CITY, 
                ZIPCODE, 
                NUMBER, 
                INFO) 
            VALUES (
                '${client.cpf}', 
                '${client.name}', 
                '${client.phone1}', 
                '${client.phone2}', 
                '${client.address.place}', 
                '${client.address.neighborhood}', 
                '${client.address.city}', 
                '${client.address.zipCode}', 
                ${client.address.number}, 
                '${client.address.info}')`;

        return Storage.executeSql(sql);
    }

    public static update(client: Client): Promise<any> {
        let sql: string = `UPDATE CLIENTS SET
                NAME = '${client.name}', 
                TELEPHONE = '${client.phone1}', 
                CELLPHONE = '${client.phone2}', 
                ADDRESS = '${client.address.place}', 
                NEIGHBORHOOD = '${client.address.neighborhood}', 
                CITY = '${client.address.city}', 
                ZIPCODE = '${client.address.zipCode}',
                NUMBER = ${client.address.number}, 
                INFO = '${client.address.info}' 
            WHERE CPF = '${client.cpf}'`;

        return Storage.executeSql(sql);
    }

    public static getAll(): Promise<Client[]> {
        return ClientDao.getClients();
    }

    public static get(cpf: string): Promise<Client> {
        return ClientDao.getClients(cpf).then((clients: Client[]) => {
            return clients[0];
        });
    }

    private static getClients(cpf?: string): Promise<Client[]> {
        return new Promise((resolve, reject) => {
            let sql: string = `SELECT * FROM CLIENTS`;

            if (cpf) {
                sql += ` WHERE CPF = '${cpf}'`;
            }

            return Storage.executeSql(sql).then((clientsStored: any) => {
                let clients: Client[] = [];

                for (let clientStored of clientsStored) {
                    let client: Client = {
                        name: clientStored.NAME,
                        cpf: clientStored.CPF,
                        phone1: clientStored.TELEPHONE,
                        phone2: clientStored.CELLPHONE,
                        address: {
                            place: clientStored.ADDRESS,
                            city: clientStored.CITY,
                            zipCode: clientStored.ZIPCODE,
                            number: clientStored.NUMBER,
                            neighborhood: clientStored.NEIGHBORHOOD,
                            info: clientStored.INFO
                        }
                    };

                    clients.push(client);
                }

                resolve(clients);
            }).catch((e) => {
                reject(e);
            })
        })
    }

}