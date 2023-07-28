import {EventEmitter, Injectable, Type} from '@angular/core';
import {DialogParams} from "../../shared/model/dialog.params";
import {NgDialogComponent} from "../ng.dialog.component";

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  private _onDialogShow: EventEmitter<DialogParams<NgDialogComponent, any>> = new EventEmitter<DialogParams<NgDialogComponent, any>>();

  public get showDialog$(): EventEmitter<DialogParams<NgDialogComponent, any>> {
    return this._onDialogShow;
  }

  public showDialog<T extends NgDialogComponent, TResult>(component: Type<T>, title?: string, isModal?: boolean, showCloseButton?: boolean, height?: number, width?: number): Promise<TResult> {
    return new Promise<TResult>((resolve, reject) => {
      let parameters: DialogParams<T, TResult> = new class implements DialogParams<T, TResult> {
        reject(reason: any): void {
        }

        resolve<TResult>(value: PromiseLike<TResult> | TResult): void {
        }

        result: Promise<TResult>;
        component: Type<T>;
        height?: number;
        isModal?: boolean;
        showCloseButton?: boolean;
        title?: string;
        width?: number;
      }

      parameters.title = title;
      parameters.isModal = isModal;
      parameters.height = height;
      parameters.width = width;
      parameters.component = component;
      parameters.resolve = resolve;
      parameters.reject = reject;
      parameters.showCloseButton = showCloseButton;

      this._onDialogShow.emit(parameters);
    });
  }

  constructor() {
  }
}
