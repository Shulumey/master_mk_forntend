import {Injectable} from '@angular/core';
import {Event, NavigationEnd, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {catchError, filter, map, timeout} from "rxjs/operators";
import {Observer, Subscription, TimeoutError} from "rxjs";
import {LayoutService} from "./layout.service";
import {ServerResponse, StatusEnum} from "../server.response";
import {APP_ROUTES} from "../constants/app.routes";


const TIMEOUT: number = 30 * 1000;

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private _pendingRequests: Map<Subscription, string> = new Map<Subscription, string>();

  constructor(
    private _layoutService: LayoutService,
    private _router: Router,
    private _httpClient: HttpClient,
  ) {
    this._router.events.pipe(
      filter((event: Event) => event instanceof NavigationEnd))
      .subscribe(() => this.onNavigationEnd());
  }

  public get<T>(url: string, successCallback: (result: T) => void, onErrorCallback?: (x: any) => void): Subscription {
    const sub: Subscription = this.sendRequest<T>("GET", url, undefined,{
      next: successCallback,
      error:(err)=>{
        this.requestEnded(sub, url);
        this.handleError(err, onErrorCallback);
      },
      complete: () => {
        this.requestEnded(sub, url);
      }
    });
    return sub;
  }

  public post<T>(url: string, body: any, successCallback: (result: T) => void, onErrorCallback?: (x: any) => void): Subscription {
    const sub: Subscription =  this.sendRequest<T>("POST", url, body, {
      next: successCallback,
      error:(err)=>{
        this.requestEnded(sub, url);
        this.handleError(err, onErrorCallback);
      },
      complete: () => {
        this.requestEnded(sub, url);
      }
    });
    return sub;
  }

  public put<T>(url: string, body: any, successCallback: (result: T) => void, onErrorCallback?: (x: any) => void): Subscription {
    return this.sendRequest<T>("PUT", url, body, {
      next: successCallback,
      error: onErrorCallback === undefined ? (_) => {
      } : onErrorCallback,
      complete: () => {
      }
    });
  }

  private sendRequest<T>(
    method: "GET" | "POST" | "PUT",
    url: string,
    body: any,
    observer: Observer<T>
  ): Subscription {
    const sub: Subscription = this._httpClient.request<ServerResponse>(method, url, !body ? undefined : {body})
      .pipe(timeout(TIMEOUT),
        map((body)=>{
          switch (body.status) {
            case StatusEnum.success:{
              return body.result as T
            }
            case StatusEnum.error:{
              throw new Error(body.result)
            }
          }
        }
      ))
      .subscribe(observer);

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

  private requestStarted(sub: Subscription, url: string): Subscription {
    this._pendingRequests.set(sub, url);

    //this._layoutService.showProgress();

    // eslint-disable-next-line no-console
    console.debug("HttpService -> requestStarted", url, this._pendingRequests.size);

    return sub;
  }

  private requestEnded(sub: Subscription, url: string): void {
    if (this._pendingRequests.size > 0) {
      this._pendingRequests.delete(sub);
    } else {
      console.warn("HttpService -> requestEnded but has zero _pendingRequests.size");
    }

    if (this._pendingRequests.size === 0) {
      // this._layoutService.hideProgress();
    }

    // eslint-disable-next-line no-console
    console.debug("HttpService -> requestEnded", url, this._pendingRequests.size);
  }


  private handleError = (err: any, errCb?: (x: unknown) => unknown): void => {
    console.error(err);
    if (!errCb || !errCb(err)) {
      let message: string = err instanceof TimeoutError
        ? "Истекло время ожидания запроса"
        : "Неопознанная ошибка!";

      if(err instanceof Error){
        message = (err as Error).message
      }

      if (err.status === 400) {
        const objErr: boolean = typeof err.error === "object";
        if (objErr) {
          if (err.error.error) {
            message = `${err.error.title}`;
          }
        } else {
          message = err.error;
        }

      } else if (err.status === 404) {
        message = err?.error || "Не найдено";
      } else if (err.status === 405) {
        message = err?.error || "Не поддерживается";
      } else if (err.status === 401) {
        message = "Необходимо авторизоваться";
      } else if (err.status === 403) {
        message = "Доступ запрещён";
      } else if (err.status === 500) {
        message = "Возникла непредвиденная ошибка на сервере";
      } else if (err.status <= 0 || err.status === 502) {
        message = "Api не запущен";
      }
      console.error(message);
      //this._layoutService.showError(message);
    }
  };

}
