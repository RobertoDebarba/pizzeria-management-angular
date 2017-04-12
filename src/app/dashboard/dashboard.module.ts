import {NgModule} from "@angular/core";
import {ChartsModule} from "ng2-charts/ng2-charts";
import {OrderComponent} from "../order/order.component";
import {DashboardRoutingModule} from "./dashboard-routing.module";
import {ClientComponent} from "../client/client.component";
import {ProductComponent} from "../product/product.component";

@NgModule({
    imports: [
        DashboardRoutingModule,
        ChartsModule
    ],
    declarations: [
        OrderComponent,
        ClientComponent,
        ProductComponent
    ]
})
export class DashboardModule {
}
