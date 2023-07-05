import {NgDialogComponent} from "../../core/ng.dialog.component";
import {Type} from "@angular/core";

export interface DialogParams<T extends NgDialogComponent> {
  title?: string,
  isModal?: boolean,
  height?: number,
  width?: number,
  showCloseButton?: boolean,
  component:  Type<T>
}
