import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AppInfoService, AuthGuardService, AuthService, DialogService, LayoutService, ScreenService} from "./services";
import {environment} from "../../environments/environment";
import {BrowserAppStorageService} from "./services/browser-app-storage.service";
import {DesktopAppStorageService} from "./services/desktop-app-storage.service";
import {JwtModule} from "@auth0/angular-jwt";
import {APP_STORAGE_SERVICE} from "./inject.tokens";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthInterceptor} from "./intercepters/auth.interceptor";
import {ErrorInterceptor} from "./intercepters/error.interceptor";

@NgModule({
  declarations: [],
  providers: [
    ScreenService,
    LayoutService,
    DialogService,
    AppInfoService,
    AuthService,
    AuthGuardService,
    {
      provide: APP_STORAGE_SERVICE,
      useClass: environment.isBrowser() ? BrowserAppStorageService : DesktopAppStorageService
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    }
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return '';
        }
      }
    })
  ]
})
export class CoreModule {
}
