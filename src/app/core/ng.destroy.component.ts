import {Directive, EventEmitter, OnDestroy, Type} from '@angular/core';
import {distinctUntilChanged, merge, mergeAll, Observable, Subscription} from "rxjs";
import notify from "devextreme/ui/notify";
import {SnackMessage, SnackPosition} from "../shared/model/snack.message";
import {LayoutService} from "./services";
import {map} from "rxjs/operators";
import {type} from "devextreme/core/utils/type";
import {ReturnStatement} from "@angular/compiler";

@Directive()
export abstract class NgDestroyComponent implements OnDestroy {
  private _properties: Map<string, any>;
  private _propertyChangeMap: Map<string, EventEmitter<{ newValue: any, oldValue: any }>>;
  public subs: Subscription[] = [];
  private isLoad: boolean
  protected messagePosition: SnackPosition

  public get isLoading(): boolean {
    return this.isLoad;
  }

  protected constructor(protected layoutService: LayoutService) {
    this.isLoad = false;
    this.messagePosition = "bottom right";

    this.appendToSubs(this.layoutService.loadding$.subscribe(isLoad => this.isLoad = isLoad));

    this._properties = new Map<string, any>();
    this._propertyChangeMap = new Map<string, EventEmitter<{
      newValue: any,
      oldValue: any
    }>>();

  }

  protected appendToSubs(sub: Subscription): void {
    this.subs.push(sub);
  }

  protected $watch(propertyName: string, callback: (newValue: any, oldValue: any) => void): void {
    let emitter = this.getPropertyChangeEmitter(propertyName)
    if (emitter) {
      this.appendToSubs(emitter.subscribe(({newValue, oldValue}) => {
        callback(newValue, oldValue);
      }));
    }
  }

  protected $watchAny(propertyNames: string[], callback: (propertyName?: string, newValue?: any, oldValue?: any) => void): void {
    propertyNames.forEach((val, i) => this.getPropertyChangeEmitter(val));
    const anyPropsRaise$: Observable<{ propertyName: string, oldValue: any, newValue: any }>[] = [];
    this._propertyChangeMap.forEach((value, key) => {
      anyPropsRaise$.push(value.pipe(map(item => {
        return {
          propertyName: key,
          oldValue: item.oldValue,
          newValue: item.newValue
        }
      })))
    })
    this.appendToSubs(merge(anyPropsRaise$).pipe(
      mergeAll()
    ).subscribe(item => callback(item.propertyName, item.newValue, item.oldValue)));
  }

  protected _set(propertyName: string, propertyValue: any) {
    let oldValue = this._get(propertyName);
    this._properties.set(propertyName, propertyValue);
    let emitter = this.getPropertyChangeEmitter(propertyName)
    if (emitter) {
      emitter.emit({
        newValue:
        propertyValue, oldValue: oldValue
      })
    }
  }

  protected _get(propertyName: string): any {
    if (!this._properties.has(propertyName)) {
      this._properties.set(propertyName, undefined);
    }
    return this._properties.get(propertyName);
  }

  protected raiseChange(properties: string[]) {
    properties.forEach((propertyName) => {
      let oldValue = this._get(propertyName);
      let emitter = this.getPropertyChangeEmitter(propertyName)
      if (emitter) {
        emitter.emit({
          newValue: oldValue, oldValue: oldValue
        })
      }
    })
  }

  private getPropertyChangeEmitter(propertyName: string): EventEmitter<{ newValue: any, oldValue: any }> | undefined {
    if (!this._propertyChangeMap.has(propertyName)) {
      this._propertyChangeMap.set(propertyName, new EventEmitter<{
        newValue: string,
        oldValue: any | null
      }>());
    }
    return this._propertyChangeMap.get(propertyName);
  }

  protected get properties(): Map<string, any> {
    let props = new Map<string, any>();
    for (let key of this._properties.keys()) {
      props.set(key, this._properties.get(key));
    }

    return props;
  }


  public ngOnDestroy(): void {
    if (this.subs && this.subs.length > 0) {
      this.subs.forEach((x: Subscription) => x && x.unsubscribe());
    }
  }

}
