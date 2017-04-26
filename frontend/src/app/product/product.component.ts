import { Component } from '@angular/core';
import { ProductService, Product } from '../provider/product.services'
import {ProductFilterPipe} from "../provider/product-filter.pipe";

@Component({
  templateUrl: 'product.component.html',
  providers: [ProductService]
})
export class ProductComponent {
  AllProducts : Product[];

  public name: string;
  public price: number;

  public textSearch: string;

  constructor(private productService: ProductService) {
    this.AtualizaProdutos();
  }

  private AtualizaProdutos(){
    this.productService.getProducts().subscribe(p => this.AllProducts = p);
  }

  







  private show(){
    document.getElementById('show').click();
  }

  public visualizar(prod: Product){

  }

  public excluir(prod: Product){

  }

  public novo(){
    this.show();
  }
}
