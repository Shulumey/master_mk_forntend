import { Injectable } from '@angular/core';
import { Event, NavigationEnd, Router } from "@angular/router";
import {HttpClient} from "@angular/common/http";
import { filter, timeout } from "rxjs/operators";
import {LayoutService} from "../../layout-module/services/layout.service";
import {Subscription} from "rxjs";


const TIMEOUT: number = 60 * 1000;

@Injectable({
  providedIn: 'root'
})
export class HttpService {


  private _pendingRequests: Map<Subscription, string> = new Map<Subscription, string>();

  constructor(
    private _router: Router,
    private _httpClient: HttpClient,
    private _layoutService: LayoutService
  ) {
    this._router.events.pipe(
      filter((event: Event) => event instanceof NavigationEnd))
      .subscribe(() => this.onNavigationEnd());
  }

  private sendRequest<T>(
    method: "GET" | "POST" | "PUT",
    url: string,
    body: any,
    successCallback: (result: T) => void,
    errCb?: (x: any) => void
  ): Subscription {
    const sub: Subscription = this._httpClient.request<T>(method, url, !body ? undefined : { body })
      .pipe(
        timeout(TIMEOUT)
      )
      .subscribe(res=>successCallback(res), error=>)
      .subscribe(
        (res: T) => successCallback(res),
        (err: any) => {
          this.requestEnded(sub, url);
          this.handleError(err, errCb);
        },
        () => this.requestEnded(sub, url)
      );
    return this.requestStarted(sub, url);
  }

  private onNavigationEnd(): void {
    if (this._pendingRequests && this._pendingRequests.size > 0) {
      for (const [sub, url] of this._pendingRequests) {
        if (sub && !sub.closed) {
          sub.unsubscribe();
          console.warn("HttpService -> onNavigationEnd -> unsubscribe", url);
        }
      }
    }

    this._pendingRequests = new Map<Subscription, string>();
  }
}
