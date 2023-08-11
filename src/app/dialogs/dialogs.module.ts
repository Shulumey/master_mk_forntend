import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SettingsDialogComponent} from "./settings-dialog/settings-dialog.component";
import {
  DevExtremeModule,
  DxDataGridModule,
  DxDropDownBoxModule,
  DxDropDownButtonModule,
  DxFormModule,
  DxTabPanelModule, DxTextBoxModule, DxValidatorModule
} from "devextreme-angular";
import { GtinEntraceDialogComponent } from './gtin-entrace-dialog/gtin-entrace-dialog.component';
import { ProductCardDialogComponent } from './product-card-dialog/product-card-dialog.component';
import { ProductOrderDialogComponent } from './product-order-dialog/product-order-dialog.component';
import {PopupDialogModule} from "../shared/components";
import { ProductSelectionDialogComponent } from './product-selection-dialog/product-selection-dialog.component';

@NgModule({
  declarations: [SettingsDialogComponent, GtinEntraceDialogComponent, ProductCardDialogComponent, ProductOrderDialogComponent, ProductSelectionDialogComponent],
  imports: [
    CommonModule,
    DxFormModule,
    DxTabPanelModule,
    DxDropDownButtonModule,
    DxDropDownBoxModule,
    DxDataGridModule,
    DxTextBoxModule,
    DxValidatorModule,
    PopupDialogModule,
    DevExtremeModule
  ]
})
export class DialogsModule { }
