import {Injectable, Type} from '@angular/core';
import {Observable, Subject} from "rxjs";
import {SnackMessage} from "../../shared/model/snack.message";
import {DialogParams} from "../../shared/model/dialog.params";
import {NgDialogComponent} from "../ng.dialog.component";

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  private _onDialogShow: Subject<DialogParams<NgDialogComponent>> = new Subject<DialogParams<NgDialogComponent>>();

  public get showDialog$(): Observable<DialogParams<NgDialogComponent>> {
    return this._onDialogShow.pipe();
  }

  public showDialog<T extends NgDialogComponent>(component: Type<T>,title?: string, isModal?: boolean, showCloseButton?: boolean,  height?: number, width?: number){
    let parameters: DialogParams<T>  = new class implements DialogParams<T> {
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

    parameters.showCloseButton = showCloseButton;

    this._onDialogShow.next(parameters);
  }

  constructor() { }
}
