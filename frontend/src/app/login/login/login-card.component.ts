import {Component} from "@angular/core";
import {AuthService, Login} from "app/dashboard/shared/service/auth.service";
import {Alert} from "app/dashboard/shared/alert/alert-message.compenent";

@Component({
    templateUrl: './login-card.component.html',
})
export class LoginCardComponent {

    public username: string;
    public password: string;

    alert1: Alert = new Alert();

    constructor(private user: AuthService) {
    }

    public login() {
        this.user.login(this.username, this.password).subscribe(
            (login: Login) => {
                localStorage.setItem('ITATAKARU', login.token);
                location.assign('/');
            }, () => {
                this.alert1.alertar('Usuário ou senha inválido!', false, () => {
                });
            }
        );
    }
}
