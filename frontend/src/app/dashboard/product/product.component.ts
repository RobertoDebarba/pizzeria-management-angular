import { Component } from '@angular/core';
import { ProductService, Product } from '../shared/service/product.services'
import { Alert } from '../shared/alert/alert-message.compenent'

@Component({
  templateUrl: 'product.component.html',
  providers: [ProductService]
})
export class ProductComponent {
  AllProducts : Product[] = [];
  currentProduct: Product = <Product>{};

  alert1 : Alert = new Alert();
  public textSearch: string;

  public ordination: string;

  constructor(private productService: ProductService) {
    this.AtualizaProdutos();
  }

  public setOrdination(ordination:string) {
    this.ordination = ordination;
    console.log(ordination);
  }

  private AtualizaProdutos(){
    this.productService.getProducts().subscribe(p => this.AllProducts = p);
  }

  private initializeCurrentPeoduct(){
    this.currentProduct = <Product>{ id: 0 };
  }

  private show(){
    document.getElementById('show').click();
    this.alert1.isVisible = false;
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
    this.alert1.alertar("Deseja Realmente Excluir o Produto?", true, ()=>{
      this.productService.excluir(prod.id)
      .subscribe(() => {
        this.AtualizaProdutos();
        this.alert1.isVisible = false;
        });
    });
  }

  public salvar(prod:Product){
    this.productService.salvar(prod)
    .subscribe(() => {
      this.AtualizaProdutos()
      this.close();
      this.alert1.alertar("Produto Salvo com Sucesso", false, ()=>{});
    });
  }

  public novo(){
    this.initializeCurrentPeoduct();
    this.show();
  }
}
