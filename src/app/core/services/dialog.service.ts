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

  public showDialog<TComponent extends NgDialogComponent, TResult, TPayload>(
    component: Type<TComponent>,
    title?: string,
    dialogId?: string,
    payload?: TPayload,
    dialogOptions?: {
      idModal?: boolean,
      showCloseButton?: boolean,
      height?: number,
      width?: number,
      maxHeight?: number,
      maxWidth?: number;
    }
  ): Promise<TResult> {
    return new Promise<TResult>((resolve, reject) => {
      let parameters: DialogParams<TComponent, TResult> = new class implements DialogParams<TComponent, TResult> {
        reject(reason: any): void {
        }

        resolve<TResult>(value: PromiseLike<TResult> | TResult): void {
        }

        result: Promise<TResult>;
        component: Type<TComponent>;
        height?: number;
        isModal?: boolean;
        showCloseButton?: boolean;
        title?: string;
        width?: number;
        maxHeight: number;
        maxWidth: number;
        payload?: TPayload;
        dialogId?: string;
      }

      parameters.title = title;
      parameters.isModal = dialogOptions?.idModal;
      parameters.height = dialogOptions?.height;
      parameters.width = dialogOptions?.width;
      parameters.component = component;
      parameters.dialogId = dialogId;
      parameters.payload = payload;
      parameters.resolve = resolve;
      parameters.reject = reject;
      parameters.showCloseButton = dialogOptions?.showCloseButton;

      this._onDialogShow.emit(parameters);
    });
  }

  constructor() {
  }
}
