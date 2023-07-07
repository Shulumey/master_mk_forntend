import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SettingsDialogComponent} from "./settings-dialog/settings-dialog.component";
import {DxFormModule, DxTabPanelModule} from "devextreme-angular";

@NgModule({
  declarations: [SettingsDialogComponent],
  imports: [
    CommonModule,
    DxFormModule,
    DxTabPanelModule
  ]
})
export class DialogsModule { }
