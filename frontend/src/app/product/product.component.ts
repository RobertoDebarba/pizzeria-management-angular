import { Component } from '@angular/core';

@Component({
  templateUrl: 'product.component.html'
})
export class ProductComponent {

  public name: string;
  public price: number;

  constructor( ) { }

}
