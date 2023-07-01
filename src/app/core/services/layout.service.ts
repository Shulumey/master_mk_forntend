import { Injectable } from '@angular/core';
import {BehaviorSubject, debounce, distinctUntilChanged, Observable, timer} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  private _loaded$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public get loaded$(): Observable<boolean> {
    return this._loaded$.pipe(
      distinctUntilChanged(),
      debounce((loaded: boolean) => {
        const milliseconds: number = loaded ? 200 : 0;
        return timer(milliseconds);
      })
    );
  }

  constructor() { }

  showError(message:string){

  }
}
