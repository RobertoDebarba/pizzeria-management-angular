import { Component } from '@angular/core';
import { ProductService, Product } from '../provider/product.services'

@Component({
  templateUrl: 'product.component.html',
  providers: [ProductService]
})
export class ProductComponent {
  AllProducts : Product[];

  public name: string;
  public price: number;

  constructor(private productService: ProductService) {
    this.AtualizaProdutos();
  }

  private AtualizaProdutos(){
    this.productService.getProducts().subscribe(p => this.AllProducts = p);
  }

}
