import {Client} from "./client.model";
import {Product} from "./product.model";

export interface Order {
    id: number,
    date: string,
    status: string,
    client: Client,
    products: {
        product: Product,
        amount: number
    }[],
    totalPrice: number
}