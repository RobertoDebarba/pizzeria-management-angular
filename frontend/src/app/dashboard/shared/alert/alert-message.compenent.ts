import {Component, Input, Output, EventEmitter} from '@angular/core';

export class Alert{
    public isVisible : boolean = false;
    public isAlert : boolean = false;
    public message : string = ' ';
    private funcao : Function;

    public cancel(){
        this.isVisible = false;
    }

    public alertar(message : string, isAlert : boolean, func : Function){
        this.message = message
        this.isAlert = isAlert;
        this.isVisible = true;
        this.funcao = func;
    }
}

@Component({
    selector: 'alert-message',
    templateUrl: './alert-message.component.html'
})
export class AlertMessageComponent {

    @Input() 
    public message : string = 'top';

    @Input() 
    isAlert : boolean = true;

    @Output() 
    cancel : EventEmitter<any> = new EventEmitter();

    @Output() 
    confirm : EventEmitter<any> = new EventEmitter();

    constructor() {
    }

    public cancelar(){
        this.cancel.emit();
    }

    public confirmar(){
        this.confirm.emit();
    }
}
