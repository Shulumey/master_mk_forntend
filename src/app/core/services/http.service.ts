import {Injectable} from '@angular/core';
import {Event, NavigationEnd, NavigationStart, Router} from "@angular/router";
import {HttpClient, HttpHeaders} from "@angular/common/http";
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
    private _httpClient: HttpClient,
  ) {
  }

  public get<T>(url: string, successCallback: (result: T | null) => void, onErrorCallback?: (x: any) => void) {
    const sub: Subscription = this.sendRequest<T>("GET", url, undefined, {
      next: successCallback,
      error: (err) => {
        this.requestEnded(sub, url);
        this.handleError(err, onErrorCallback);
        sub.unsubscribe();
      },
      complete: () => {
        this.requestEnded(sub, url);
        sub.unsubscribe();
      }
    });
  }

  public post<T>(url: string, body: any, successCallback: (result: T | null) => void, onErrorCallback?: (x: any) => void) {
    const sub: Subscription = this.sendRequest<T>("POST", url, body, {
      next: successCallback,
      error: (err) => {
        this.requestEnded(sub, url);
        this.handleError(err, onErrorCallback);
        sub.unsubscribe();
      },
      complete: () => {
        this.requestEnded(sub, url);
        sub.unsubscribe();
      }
    });
  }

  public put<T>(url: string, body: any, successCallback: (result: T | null) => void, onErrorCallback?: (x: any) => void): Subscription {
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
    observer: Observer<T | null>
  ): Subscription {
    const sub: Subscription = this._httpClient.request<ServerResponse>(method, url, !body ? undefined : {body})
      .pipe(timeout(TIMEOUT),
        map((body) => body.result as T))
      .subscribe(observer);

    return this.requestStarted(sub, url);
  }

  public destroySubs(): void {
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
    //this._pendingRequests.set(sub, url);

    this._layoutService.loadStart();

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
      this._layoutService.loadEnd();
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

      if (err instanceof Error) {
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
      this._layoutService.showError(message);
    }
  };

}
