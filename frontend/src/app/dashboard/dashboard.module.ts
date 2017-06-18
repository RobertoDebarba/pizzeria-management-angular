import { ClientFilterPipe } from './shared/pipe/client-filter.pipe';
import { OrderFilterPipe } from './shared/pipe/order-filter.pipe';
import {NgModule} from "@angular/core";
import {ChartsModule} from "ng2-charts/ng2-charts";
import {OrderComponent} from "./order/order.component";
import {DashboardRoutingModule} from "./dashboard-routing.module";
import {ClientComponent} from "./client/client.component";
import {ProductComponent} from "./product/product.component";
import { ModalModule } from 'ng2-bootstrap/modal';
import {OrderService} from './shared/service/order.service'
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';
import {ProductFilterPipe} from "./shared/pipe/product-filter.pipe";
import {SortByPipe} from "./shared/pipe/sort.pipe";
import { SharedModule } from "app/shared/shared.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        DashboardRoutingModule,
        ChartsModule,
        TextMaskModule,
        ModalModule.forRoot(),
        SharedModule
    ],
    declarations: [
        OrderComponent,
        ClientComponent,
        ProductComponent,
        ProductFilterPipe,
        OrderFilterPipe,
        ClientFilterPipe,
        SortByPipe
    ],
    providers: [
        OrderService
    ]
})
export class DashboardModule {
}
