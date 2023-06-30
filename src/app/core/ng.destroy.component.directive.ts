import {OnDestroy} from '@angular/core';
import {Subscription} from "rxjs";

export class NgDestroyComponentDirective implements OnDestroy  {
  subs: Subscription[] = [];

  protected appendToSubs(sub:Subscription): void{
    this.subs.push(sub);
  }

  public ngOnDestroy(): void {
    if (this.subs && this.subs.length > 0) {
      this.subs.forEach((x: Subscription) => x && x.unsubscribe());
    }
  }

}
