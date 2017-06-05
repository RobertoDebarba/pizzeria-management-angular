import {Pipe, PipeTransform} from '@angular/core';
import {Client} from "../service/client.services";

@Pipe({name: 'clientFilter'})
export class ClientFilterPipe implements PipeTransform {

    transform(clients:Client[], text:string):Client[] {
        if (clients == null || text == null || text.length == 0) {
            return clients;
        }

        return clients.filter(client => {
            return client.cpf.toString().indexOf(text) >= 0 ||
                client.name.toString().toUpperCase().indexOf(text.toUpperCase()) >= 0||
                client.phone1.toString().indexOf(text) >= 0||
                client.phone2.toString().indexOf(text) >= 0;
        })

    }
}