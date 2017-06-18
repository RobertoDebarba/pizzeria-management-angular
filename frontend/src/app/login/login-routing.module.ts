import {NgModule} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";
import {LoginCardComponent} from "./login/login-card.component";

const routes: Routes = [
    {
        path: '',
        component: LoginCardComponent,
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