import {Component} from '@angular/core';
import {NgDialogComponent} from "../../core/ng.dialog.component";
import {LayoutService} from "../../core/services";

@Component({
  selector: 'app-gtin-entrace-dialog',
  templateUrl: './gtin-entrace-dialog.component.html',
  styleUrls: ['./gtin-entrace-dialog.component.scss']
})
export class GtinEntraceDialogComponent extends NgDialogComponent {

  gtin:string
  useMaskedValue: boolean = true;
  constructor(layoutService: LayoutService) {
    super(layoutService);
  }

  override onConfirm() {
    this.resolver(this.gtin)
    this.onClose();
  }
}
