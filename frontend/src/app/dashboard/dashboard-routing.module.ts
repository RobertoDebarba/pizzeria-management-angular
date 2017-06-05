import {NgModule} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";
import {OrderComponent} from "./order/order.component";
import {ProductComponent} from "./product/product.component";
import {ClientComponent} from "./client/client.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'order',
    pathMatch: 'full',
  },
  {
    path: 'order',
    component: OrderComponent,
    data: {
      title: 'Pedidos'
    }
  },
  {
    path: 'product',
    component: ProductComponent,
    data: {
      title: 'Produtos'
    }
  },
  {
    path: 'client',
    component: ClientComponent,
    data: {
      title: 'Clientes'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
