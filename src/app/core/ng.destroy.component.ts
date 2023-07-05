import {Directive, OnDestroy} from '@angular/core';
import {Subscription} from "rxjs";
import notify from "devextreme/ui/notify";
import {SnackPosition} from "../shared/model/snack.message";
import {LayoutService} from "./services";

@Directive()
export abstract class NgDestroyComponent implements OnDestroy {
  public subs: Subscription[] = [];
  private isLoad: boolean
  protected messagePosition: SnackPosition

  public get isLoading(): boolean {
    return this.isLoad;
  }

  constructor(protected layoutService: LayoutService) {
    this.isLoad = false;
    this.messagePosition = "bottom right";

    this.appendToSubs(this.layoutService.loadding$.subscribe(isLoad => this.isLoad = isLoad));
    this.appendToSubs(this.layoutService.messages$.subscribe(value => notify({
      message: value.message,
      type: value.messageType,
      displayTime: value.duration,
      width: 400
    }, {
      position: this.messagePosition,
      direction: "up-stack"
    })));
  }

  protected appendToSubs(sub: Subscription): void {
    this.subs.push(sub);
  }

  public ngOnDestroy(): void {
    if (this.subs && this.subs.length > 0) {
      this.subs.forEach((x: Subscription) => x && x.unsubscribe());
    }
  }

}
