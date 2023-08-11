import {NgDialogComponent} from "../../core/ng.dialog.component";
import {Type} from "@angular/core";

export interface DialogParams<T extends NgDialogComponent, TResult> {
  title?: string,
  isModal?: boolean,
  height?: number,
  width?: number,
  maxWidth?: number,
  maxHeight?: number,
  showCloseButton?: boolean,
  component: Type<T>,
  payload?: any,
  dialogId?: string,
  resolve: (value: TResult | PromiseLike<TResult>) => void,
  reject: (reason?: any) => void,
}
