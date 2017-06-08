import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import { AppComponent } from './app.component';
import { DropdownModule } from 'ng2-bootstrap/dropdown';
import { TabsModule } from 'ng2-bootstrap/tabs';

import { ChartsModule } from 'ng2-charts/ng2-charts';

// Routing Module
import { AppRoutingModule } from './app.routing';

//Layouts
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';

//Services
import {AuthGuard} from './dashboard/shared/service/auth-guard.service';

@NgModule({
  imports: [
    BrowserModule,
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
  providers: [{
    provide: LocationStrategy,
    useClass: HashLocationStrategy
  }, AuthGuard],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
