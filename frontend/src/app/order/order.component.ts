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
  AllProducts: Product[] = [];
  selectProduct: Product;
  selectQuantidade : number;

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
    this.productService.getProducts().subscribe(p => this.AllProducts = p);
    this.products = [];
    for(let prod of this.AllProducts){
      this.products.push(prod);
    }
  }

  private internalNewOrder(){
    this.currentOrder = <Order>{};
    this.currentOrder.id = 0;
    this.currentOrder.date = Date.now().toString();
    this.currentOrder.products = [];
    this.currentOrder.status = 'PENDING';
    this.currentOrder.totalPrice = 0;
    this.AtualizaClientes();
    this.AtualizaProdutos();
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

  public anulateField(){
    this.selectClient = null;
  }

  public close(){
      document.getElementById('close').click();
  }

  public excluirProduto(prod : {product:Product, amount:number}){
     this.currentOrder.products.splice(this.currentOrder.products.indexOf(prod), 1);
     this.products.push(prod.product);
  }

  public adcionaProduct(){
    this.products.splice(this.products.indexOf(this.selectProduct), 1);
    this.currentOrder.products.push({product: this.selectProduct, amount: this.selectQuantidade});
    this.selectQuantidade = null;
  }

  public salvar(ord: Order){
    this.currentOrder.client = this.selectClient;
    this.orderServices.salvar(ord);
    this.close();
    this.atualizaOrders();
  }
}
