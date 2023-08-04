import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, timeout} from "rxjs/operators";
import {Observable, Observer, tap, TimeoutError} from "rxjs";
import {LayoutService} from "./layout.service";
import {ServerResponse} from "../server.response";


const TIMEOUT: number = 30 * 1000;

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private _pendingCountInvocation: number;

  constructor(
    private _layoutService: LayoutService,
    private _httpClient: HttpClient,
  ) {
    this._pendingCountInvocation = 0;
  }

  public get<T>(url: string): Observable<T | null> {
    return this.sendRequest<T>("GET", url, undefined);
  }

  public post<T>(url: string, body: any): Observable<T | null> {
    return this.sendRequest<T>("POST", url, body);
  }

  public put<T>(url: string, body: any): Observable<T | null> {
    return this.sendRequest<T>("PUT", url, body);
  }

  private sendRequest<T>(
    method: "GET" | "POST" | "PUT",
    url: string,
    body: any,
  ): Observable<T> {

    this.requestStarted(url);

    const loadingObserver: Observer<ServerResponse> = {
      next: _ => this.requestEnded(url),
      error: err => {
        this.requestEnded(url);
        this.handleError(err);
      },
      complete: () => this.requestEnded(url)
    };

    return this._httpClient.request<ServerResponse>(method, url, !body ? undefined : {body})
      .pipe(timeout(TIMEOUT),
        tap(loadingObserver),
        map((body) => body.result as T));
  }

  private requestStarted(url: string): void {

    this._pendingCountInvocation++;
    this._layoutService.loadStart();

    // eslint-disable-next-line no-console
    console.debug("HttpService -> requestStarted", url);
  }

  private requestEnded(url: string): void {
    if (this._pendingCountInvocation > 0) {
      this._layoutService.loadEnd();
    }

    // eslint-disable-next-line no-console
    console.debug("HttpService -> requestEnded", url);
  }


  private handleError = (err: any): void => {
    console.error(err);
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
      message = "Сервис не запущен";
    }
    console.error(message);
    this._layoutService.showError(message);
  };

}
