import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {OrdersComponent} from "./orders/orders.component";
import {OrderViewComponent} from "./order.view/order.view.component";
import {DevExtremeModule} from "devextreme-angular";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {RouterLink} from "@angular/router";
import { CodeMarksReceivedComponent } from './code-marks-received/code-marks-received.component';



@NgModule({
  declarations: [OrdersComponent, OrderViewComponent, CodeMarksReceivedComponent],
  imports: [
    CommonModule,
    DevExtremeModule,
    FontAwesomeModule,
    RouterLink
  ]
})
export class PagesModule { }
