import {Component, Input} from '@angular/core';

@Component({
    selector: 'alert-message',
    templateUrl: './alert-message.component.html'
})
export class AlertMessageComponent {

    @Input() message : string = 'top';
    @Input() isAlert : boolean = true;



    constructor() {
    }

    public cancelar(){

    }

    public confirmar(){

    }
}
