import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AppInfoService, AuthGuardService, AuthService, LayoutService, ScreenService} from "./services";
import {environment} from "../../environments/environment";
import {BrowserAppStorageService} from "./services/browser-app-storage.service";
import {DesktopAppStorageService} from "./services/desktop-app-storage.service";
import {JwtModule} from "@auth0/angular-jwt";
import {APP_STORAGE_SERVICE} from "./inject.tokens";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [],
  providers: [
    ScreenService,
    LayoutService,
    AppInfoService,
    AuthService,
    AuthGuardService,
    {provide: APP_STORAGE_SERVICE, useClass: environment.isBrowser() ? BrowserAppStorageService: DesktopAppStorageService}
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
