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

  private setCurrentOrder(id: number){
    this.orderServices.getOrder(id).subscribe(c => {
      this.currentOrder = c;
      console.log(this.currentOrder);
    });
    console.log(this.currentOrder);
  }

  private show(){
    document.getElementById('show').click();
  }

  public visualizar(id: number){
    this.setCurrentOrder(id);
    this.show();
  }

  public newOrder(){
    this.show();
  }

  public cancelar(id: number){

  }

  public confirmar(id:number){

  }
}
