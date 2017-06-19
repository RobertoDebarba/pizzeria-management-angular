import { Component , ViewChild, ElementRef } from '@angular/core';
import { ProductService, Product } from '../shared/service/product.services'
import { Alert } from '../shared/alert/alert-message.compenent'

@Component({
  templateUrl: 'product.component.html',
  providers: [ProductService]
})
export class ProductComponent {
  AllProducts : Product[] = [];
  currentProduct: Product = <Product>{};

  @ViewChild('alerta1') viewAlert1:ElementRef;

  alert1 : Alert = new Alert();

  public isEdit: boolean = false;

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
    this.isEdit = true;

    this.initializeCurrentPeoduct();
    this.currentProduct.id = prod.id;
    this.currentProduct.name = prod.name;
    this.currentProduct.price = prod.price;
    this.show();
  }

  public salvar(prod:Product){
    if (this.isEdit) {
      this.productService.editar(prod).subscribe(() => {
        this.AtualizaProdutos();
        this.close();
        this.alert1.alertar("Produto alterado com sucesso", false, ()=>{});
        this.viewAlert1.nativeElement.scrollIntoView();
      });
    } else {
      this.productService.salvar(prod).subscribe(() => {
        this.AtualizaProdutos();
        this.close();
        this.alert1.alertar("Produto salvo com sucesso", false, ()=>{});
        this.viewAlert1.nativeElement.scrollIntoView();
      });
    }
  }

  public novo(){
    this.isEdit = false;

    this.initializeCurrentPeoduct();
    this.show();
  }
}
