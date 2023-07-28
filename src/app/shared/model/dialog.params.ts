import {NgDialogComponent} from "../../core/ng.dialog.component";
import {Type} from "@angular/core";

export interface DialogParams<T extends NgDialogComponent, TResult> {
  title?: string,
  isModal?: boolean,
  height?: number,
  width?: number,
  showCloseButton?: boolean,
  component: Type<T>,
  resolve: (value: TResult | PromiseLike<TResult>) => void,
  reject: (reason?: any) => void,
}
