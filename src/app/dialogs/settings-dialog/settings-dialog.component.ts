import { Component } from '@angular/core';
import {NgDialogComponent} from "../../core/ng.dialog.component";
import {LayoutService} from "../../core/services";
import {Certificate} from "../../shared/model/certificate";

@Component({
  selector: 'app-settings-dialog',
  templateUrl: './settings-dialog.component.html',
  styleUrls: ['./settings-dialog.component.scss']
})
export class SettingsDialogComponent extends NgDialogComponent{

  settings: any = {}
  certificates: Certificate[] = []
  selectedCertificate: string[] = []

  constructor(layoutService: LayoutService) {
    super(layoutService);
  }

  onConfirm(): void {
  }

}
