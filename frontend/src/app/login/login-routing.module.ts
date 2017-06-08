import {NgModule} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";
import {LoginComponent} from "./login/login.component";

const routes: Routes = [
    {
        path: '',
        component: LoginComponent,
        data: {
            title: 'Login'
        },
        pathMatch: 'full',
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LoginRoutingModule {}