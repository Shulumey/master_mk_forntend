import { Component } from '@angular/core';
import {NgDialogComponent} from "../../core/ng.dialog.component";
import {LayoutService} from "../../core/services";

@Component({
  selector: 'app-settings-dialog',
  templateUrl: './settings-dialog.component.html',
  styleUrls: ['./settings-dialog.component.scss']
})
export class SettingsDialogComponent extends NgDialogComponent{

  settings: any = {}
  constructor(layoutService: LayoutService) {
    super(layoutService);
  }

  onConfirm(): void {
  }

}
