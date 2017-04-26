import { Order } from './order.service';
import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'orderFilter'})
export class OrderFilterPipe implements PipeTransform {

    transform(order:Order[], text:string):Order[] {
        if (order == null || text == null || text.length == 0) {
            return order;
        }
        let pendente: string = 'PENDING';
        let cancelado: string = 'CANCELED';
        let concluido: string = 'DONE';

        return order.filter(Order => {
            return Order.client.name.toString().toUpperCase().indexOf(text.toUpperCase()) >= 0 ;
        })

    }
}