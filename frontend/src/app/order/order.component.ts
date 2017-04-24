import { OrderService, Order } from './../provider/order.service';
import { Component } from '@angular/core';

@Component({
  templateUrl: 'order.component.html'
})

export class OrderComponent {
  orders: Order[] = [];
  currentOrder: Order = <Order>{};

  constructor(private orderServices: OrderService){
    this.atualizaOrders();
    this.internalNewOrder();
  }

  private atualizaOrders(){
    this.orderServices.getOrders().subscribe(o => this.orders = o);
  }

  private internalNewOrder(){
    this.currentOrder = <Order>{};
    this.currentOrder.id = 0;
    this.currentOrder.date = Date.now().toString();
    this.currentOrder.products = [];
    this.currentOrder.status = 'PENDING';
    this.currentOrder.totalPrice = 0;
  }

  private setCurrentOrder(ord: Order){
    this.currentOrder = ord;
  }

  private show(){
    document.getElementById('show').click();
  }

  public visualizar(ord: Order){
    this.setCurrentOrder(ord);
    this.show();
  }

  public newOrder(){
    this.internalNewOrder();
    this.show();
  }

  public cancelar(ord: Order){
    this.orderServices.cancelar(ord.id);
    this.atualizaOrders();
  }

  public confirmar(ord: Order){
    this.orderServices.confirmar(ord.id);
    this.atualizaOrders();
  }
}
