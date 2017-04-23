import { OrderService, Order } from './../provider/order.service';
import { Component } from '@angular/core';

@Component({
  templateUrl: 'order.component.html'
})

export class OrderComponent {
  orders: Order[] = [];
  currentOrder: Order;

  constructor(private orderServices: OrderService){
    this.atualizaOrders();
  }

  private atualizaOrders(){
    this.orderServices.getOrders().subscribe(o => this.orders = o);
  }

  // public setCurrentOrder(id: number){
  //   this.orderServices.getOrder(id)
  // }
}
