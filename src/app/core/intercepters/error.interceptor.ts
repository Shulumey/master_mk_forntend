import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse, HttpStatusCode} from '@angular/common/http';
import {Observable, tap, throwError} from 'rxjs';
import {AuthService, LayoutService} from "../services";
import {catchError} from "rxjs/operators";
import {ServerResponse, StatusEnum} from "../server.response";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService, private layoutService: LayoutService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          let response = event.body as ServerResponse | null;
          if (response !== null && response.status === StatusEnum.error) {
            throw new Error(response.result);
          }
        }
      }),
      catchError(err => {
        if ([HttpStatusCode.Unauthorized, HttpStatusCode.Forbidden].includes(err.status) && this.authService.isLoggedIn) {
          this.authService.logOut();
        }
        return throwError(() => err);
      }));
  }
}
