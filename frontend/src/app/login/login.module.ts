import { HttpModule } from '@angular/http';
import {NgModule} from "@angular/core";
import {ChartsModule} from "ng2-charts/ng2-charts";
import { ModalModule } from 'ng2-bootstrap/modal';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';
import {LoginCardComponent} from './login/login-card.component';
import {LoginRoutingModule} from "./login-routing.module";
import { SharedModule } from "app/shared/shared.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        HttpModule,
        ChartsModule,
        LoginRoutingModule,
        TextMaskModule,
        ModalModule.forRoot(),
        SharedModule
    ],
    declarations: [
        LoginCardComponent
    ]
})
export class LoginModule {
}