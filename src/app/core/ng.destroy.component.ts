import {Directive, OnDestroy} from '@angular/core';
import {Subscription} from "rxjs";
import {LayoutService} from "./services";

@Directive()
export class NgDestroyComponent implements OnDestroy {
  public subs: Subscription[] = [];
  public isLoading: boolean


  constructor(protected layoutService: LayoutService) {
    this.isLoading = false;

    this.appendToSubs(this.layoutService.loaded$.subscribe(isLoad=>this.isLoading = isLoad));
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
