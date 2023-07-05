import {Injectable} from '@angular/core';
import {BehaviorSubject, debounce, distinctUntilChanged, Observable, Subject, timer} from "rxjs";
import {SnackMessage} from "../../shared/model/snack.message";

@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  private _messages$: Subject<SnackMessage> = new Subject<SnackMessage>();
  private _loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public get loadding$(): Observable<boolean> {
    return this._loading$.pipe(
      distinctUntilChanged(),
      debounce((loaded: boolean) => {
        const milliseconds: number = loaded ? 200 : 0;
        return timer(milliseconds);
      })
    );
  }

  public get messages$(): Observable<SnackMessage> {
    return this._messages$.pipe();
  }

  constructor() {
  }

  public loadStart(): void {
    this._loading$.next(true);
  }

  public loadEnd(): void {
    this._loading$.next(false);
  }

  public showInfo(text: string): void {
    const message: SnackMessage = {
      duration: 10000,
      messageType: "info",
      message: text
    };
    this._messages$.next(message);
  }

  public showSuccess(text: string): void {
    const message: SnackMessage = {
      duration: 10000,
      messageType: "success",
      message: text
    };
    this._messages$.next(message);
  }

  public showWarning(text: string): void {
    const message: SnackMessage = {
      duration: 10000,
      messageType: "warning",
      message: text
    };
    this._messages$.next(message);
  }

  public showError(text: string): void {
    const message: SnackMessage = {
      duration: 10000,
      messageType: "error",
      message: text
    };
    this._messages$.next(message);
  }
}
