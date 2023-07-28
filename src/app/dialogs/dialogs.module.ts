import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SettingsDialogComponent} from "./settings-dialog/settings-dialog.component";
import {
  DxDataGridModule,
  DxDropDownBoxModule,
  DxDropDownButtonModule,
  DxFormModule,
  DxTabPanelModule, DxTextBoxModule, DxValidatorModule
} from "devextreme-angular";
import { GtinEntraceDialogComponent } from './gtin-entrace-dialog/gtin-entrace-dialog.component';
import { ProductCardDialogComponent } from './product-card-dialog/product-card-dialog.component';

@NgModule({
  declarations: [SettingsDialogComponent, GtinEntraceDialogComponent, ProductCardDialogComponent],
  imports: [
    CommonModule,
    DxFormModule,
    DxTabPanelModule,
    DxDropDownButtonModule,
    DxDropDownBoxModule,
    DxDataGridModule,
    DxTextBoxModule,
    DxValidatorModule
  ]
})
export class DialogsModule { }
