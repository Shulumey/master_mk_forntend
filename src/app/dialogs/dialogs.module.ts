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

@NgModule({
  declarations: [SettingsDialogComponent],
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
