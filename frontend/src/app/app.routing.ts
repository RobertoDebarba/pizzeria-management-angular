import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Layouts
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';

//Services
import { AuthGuard } from '../app/dashboard/shared/service/auth-guard.service';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: '',
    canActivate: [AuthGuard],
    component: DashboardComponent,
    data: {
      title: 'Início'
    },
    children: [
      {
        path: 'dashboard',
        loadChildren: './dashboard/dashboard.module#DashboardModule',
        canActivateChild: [AuthGuard],
      },
    ]
  },
  {
    path: '',
    component: LoginComponent,
    data: {
      title: 'Login'
    },
    children: [
      {
        path: 'login',
        loadChildren: './login/login.module#LoginModule'
      },
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
