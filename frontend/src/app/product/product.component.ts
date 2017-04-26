import { Component } from '@angular/core';
import { ProductService, Product } from '../provider/product.services'
import {ProductFilterPipe} from "../provider/product-filter.pipe";

@Component({
  templateUrl: 'product.component.html',
  providers: [ProductService]
})
export class ProductComponent {
  AllProducts : Product[] = [];
  currentProduct: Product = <Product>{};

  public textSearch: string;

  constructor(private productService: ProductService) {
    this.AtualizaProdutos();
  }

  private AtualizaProdutos(){
    this.productService.getProducts().subscribe(p => this.AllProducts = p);
  }

  private initializeCurrentPeoduct(){
    this.currentProduct = <Product>{ id: 0 };
  }

  private show(){
    document.getElementById('show').click();
  }

  private close(){
      document.getElementById('close').click();
  }

  public visualizar(prod: Product){
    this.initializeCurrentPeoduct();
    this.currentProduct.id = prod.id;
    this.currentProduct.name = prod.name;
    this.currentProduct.price = prod.price;
    this.show();
  }

  public excluir(prod: Product){
    this.productService.excluir(prod.id);
    this.AtualizaProdutos();
  }

  public salvar(prod:Product){
    console.log('teste');
    this.productService.salvar(prod);
    this.AtualizaProdutos();
    this.close();
  }

  public novo(){
    this.initializeCurrentPeoduct();
    this.show();
  }
}
