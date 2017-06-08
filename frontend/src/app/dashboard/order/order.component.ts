import { OrderService, Order } from '../shared/service/order.service';
import { ProductService, Product } from '../shared/service/product.services';
import { ClientService, Client } from '../shared/service/client.services';
import { Component } from '@angular/core';
import {Injectable} from '@angular/core';
import { Alert } from '../shared/alert/alert-message.compenent'


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
  adicionouProduct: boolean;
  alert1 : Alert = new Alert();
  alert2 : Alert = new Alert();
  alert3 : Alert = new Alert();

  public textSearch: string;
  public ordination: string;
  public ordinationAttribute: string;

  constructor(private orderServices: OrderService, private clientService: ClientService,
               private productService: ProductService){
    this.atualizaOrders();
    this.internalNewOrder();
  }

  public setOrdination(ordination:string) {
    this.ordination = ordination;

    if (ordination == 'client') {
      this.ordinationAttribute = 'name';
    } else {
      this.ordinationAttribute = null;
    }
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
    this.currentOrder.date = new Date(Date.now()).toISOString();
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
    this.selectClient = null;
    this.adicionouProduct = false;
    this.alert1.isVisible = false;
  }

  public visualizar(ord: Order){
    this.alert1.isVisible = false;
    this.alert2.isVisible = false;
    this.alert3.isVisible = false;
    this.setCurrentOrder(ord);
    this.show();
  }

  public newOrder(){
    this.internalNewOrder();
    this.show();
  }

  public cancelar(ord: Order){
    this.alert1.alertar("Deseja Realmente Cancelar o Pedido?", true, ()=>{this.doCancelar(ord)});
  }

  public cancelarCurrent(){
    this.alert2.alertar("Deseja Realmente Cancelar o Pedido?", true, ()=>{this.doCancelar(this.currentOrder)});
  }

  private doCancelar(ord: Order){
    this.alert1.isVisible = false;
    this.alert2.isVisible = false;
    this.orderServices.cancelar(ord.id)
    .subscribe(() => {
      this.close();
      this.atualizaOrders();
    });
  }

  public confirmar(ord: Order){
    this.alert1.alertar("Deseja Realmente Confirmar a Pedido?", true, ()=>{this.doConfirmar(ord)});
  }

  public confirmarCurrent(){
    this.alert2.alertar("Deseja Realmente Confirmar o Pedido?", true, ()=>{this.doConfirmar(this.currentOrder)});
  }

  private doConfirmar(ord: Order){
    this.alert1.isVisible = false;
    this.alert2.isVisible = false;
    this.orderServices.confirmar(ord.id)
    .subscribe(() => {
      this.atualizaOrders();
      this.close();
    });
  }

  public close(){
      document.getElementById('close').click();
  }

  public excluirProduto(prod : {product:Product, amount:number}){
    this.alert3.alertar("Deseja Realmente excluir o Produto?", true, ()=>{
      this.alert3.isVisible = false;
      this.currentOrder.products.splice(this.currentOrder.products.indexOf(prod), 1);
      this.products.push(prod.product);
     });
  }

  public adcionaProduct(){
    this.adicionouProduct = true;
    this.products.splice(this.products.indexOf(this.selectProduct), 1);
    this.currentOrder.products.push({product: this.selectProduct, amount: this.selectQuantidade});
    this.selectQuantidade = null;
  }

  public salvar(ord: Order){
    this.currentOrder.client = this.selectClient;
    this.orderServices.salvar(ord)
    .subscribe(() => {
      this.close();
      this.alert1.alertar("Pedido Criado com Sucesso", false, ()=>{});
      this.atualizaOrders();
    });
  }
}