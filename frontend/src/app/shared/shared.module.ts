import { NgModule } from '@angular/core';
import { AlertMessageComponent } from "app/dashboard/shared/alert/alert-message.compenent";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ModalModule } from "ng2-bootstrap/modal";
import { TextMaskModule } from "angular2-text-mask/dist/angular2TextMask";
import { ChartsModule } from "ng2-charts";
import { HttpModule } from "@angular/http";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        HttpModule,
        ChartsModule,
        TextMaskModule,
        ModalModule.forRoot(),
    ],
    declarations: [
        AlertMessageComponent
    ],
    exports: [AlertMessageComponent]
})
export class SharedModule { }
