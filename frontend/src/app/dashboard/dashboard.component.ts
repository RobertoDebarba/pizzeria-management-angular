import {Component} from '@angular/core';
import {Router} from "@angular/router";

interface Page {
    title:string,
    route:string
}

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html'
})
export class DashboardComponent {

    public pages:Page[] = [
        {title: 'Pedidos', route: 'order'},
        {title: 'Cliente', route: 'client'},
        {title: 'Produto', route: 'product'},
    ];

    constructor(private router:Router) {
    }

    public isActivePage(page:Page):boolean {
        return this.router.url.indexOf(page.route) > 0
    }

    public sair(){
        localStorage.removeItem('ITATAKARU');
        location.assign('/');
    }

}
