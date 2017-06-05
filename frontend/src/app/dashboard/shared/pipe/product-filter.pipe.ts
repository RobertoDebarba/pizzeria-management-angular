import {Pipe, PipeTransform} from '@angular/core';
import {Product} from "../service/product.services";

@Pipe({name: 'productFilter'})
export class ProductFilterPipe implements PipeTransform {

    transform(products:Product[], text:string):Product[] {
        if (products == null || text == null || text.length == 0) {
            return products;
        }

        return products.filter(product => {
            return product.id.toString().indexOf(text) >= 0 ||
                product.name.toString().toUpperCase().indexOf(text.toUpperCase()) >= 0;
        })

    }
}