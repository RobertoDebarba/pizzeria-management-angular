import { HttpModule } from '@angular/http';
import {NgModule} from "@angular/core";
import {ChartsModule} from "ng2-charts/ng2-charts";
import {OrderComponent} from "../order/order.component";
import {DashboardRoutingModule} from "./dashboard-routing.module";
import {ClientComponent} from "../client/client.component";
import {ProductComponent} from "../product/product.component";
import { ModalModule } from 'ng2-bootstrap/modal';
import {OrderService} from '../provider/order.service'
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {ProductFilterPipe} from "../provider/product-filter.pipe";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        HttpModule,
        DashboardRoutingModule,
        ChartsModule,
        ModalModule.forRoot()
    ],
    declarations: [
        OrderComponent,
        ClientComponent,
        ProductComponent,
        ProductFilterPipe
    ],
    providers: [
        OrderService
    ]
})
export class DashboardModule {
}
