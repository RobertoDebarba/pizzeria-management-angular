import { OrderService, Order } from './../provider/order.service';
import { ProductService, Product } from './../provider/product.services';
import { ClientService, Client } from './../provider/client.services';
import { Component } from '@angular/core';
import {Injectable} from '@angular/core';

@Component({
  templateUrl: 'order.component.html',
  providers: [OrderService, ClientService, ProductService]
})

@Injectable()
export class OrderComponent {
  orders: Order[] = [];
  currentOrder: Order = <Order>{};
  clients: Client[] = [];
  selectClient: Client;
  products: Product[] = [];
  selectProduct: Product;

  constructor(private orderServices: OrderService, private clientService: ClientService,
               private productService: ProductService){
    this.atualizaOrders();
    this.AtualizaClientes();
    this.AtualizaProdutos();
    this.internalNewOrder();
  }

  private atualizaOrders(){
    this.orderServices.getOrders().subscribe(o => this.orders = o);
  }

  private AtualizaClientes(){
    this.clientService.getClients().subscribe(c => this.clients = c);
  }

  private AtualizaProdutos(){
    this.productService.getProducts().subscribe(p => this.products = p);
  }

  private internalNewOrder(){
    this.currentOrder = <Order>{};
    this.currentOrder.id = 0;
    this.currentOrder.date = Date.now().toString();
    this.currentOrder.products = [];
    this.currentOrder.status = 'PENDING';
    this.currentOrder.totalPrice = 0;
    this.AtualizaClientes();
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
    this.close();
    this.atualizaOrders();
  }

  public confirmar(ord: Order){
    this.orderServices.confirmar(ord.id);
    this.close();
    this.atualizaOrders();
  }

  public close(){
      document.getElementById('close').click();
  }
}
