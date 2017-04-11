import { NgModule } from '@angular/core';
import { Routes,
     RouterModule } from '@angular/router';

import { OrderComponent } from '../order/order.component';

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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
