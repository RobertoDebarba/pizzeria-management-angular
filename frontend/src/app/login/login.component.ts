import {Component} from '@angular/core';
import {Router} from "@angular/router";

interface Page {
    title:string,
    route:string
}

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html'
})
export class LoginComponent {

    public pages:Page[] = [
        {title: 'Login', route: 'login'},
    ];

    constructor(private router:Router) {
    }

    public isActivePage(page:Page):boolean {
        return this.router.url.indexOf(page.route) > 0
    }

}