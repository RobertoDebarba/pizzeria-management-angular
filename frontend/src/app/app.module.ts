import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {HashLocationStrategy, LocationStrategy} from "@angular/common";

import {AppComponent} from "./app.component";
import {DropdownModule} from "ng2-bootstrap/dropdown";
import {TabsModule} from "ng2-bootstrap/tabs";

import {ChartsModule} from "ng2-charts/ng2-charts";

import {AppRoutingModule} from "./app.routing";

import {DashboardComponent} from "./dashboard/dashboard.component";
import {LoginComponent} from "./login/login.component";

import {AuthGuard} from "./dashboard/shared/service/auth-guard.service";
import {AuthService} from "./dashboard/shared/service/auth.service";
import {Http, HttpModule, RequestOptions, XHRBackend} from "@angular/http";
import {httpFactory} from "./intercepted-http";

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        AppRoutingModule,
        DropdownModule.forRoot(),
        TabsModule.forRoot(),
        ChartsModule
    ],
    declarations: [
        AppComponent,
        DashboardComponent,
        LoginComponent
    ],
    providers: [
        {
            provide: LocationStrategy,
            useClass: HashLocationStrategy
        },
        AuthGuard,
        AuthService,
        {
            provide: Http,
            useFactory: httpFactory,
            deps: [XHRBackend, RequestOptions]
        }
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {
}
