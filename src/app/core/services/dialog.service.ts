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
  private _onDialogVisibility: Subject<boolean> = new Subject<boolean>();

  public get showDialog$(): Observable<DialogParams<NgDialogComponent>> {
    return this._onDialogShow.pipe();
  }

  public get dialogVisibility$(): Observable<boolean> {
    return this._onDialogVisibility.pipe();
  }
  constructor() { }
}
