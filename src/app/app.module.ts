import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SideNavOuterToolbarModule, SideNavInnerToolbarModule, SingleCardModule } from './layouts';
import { FooterModule, ChangePasswordFormModule, LoginFormModule, PopupDialogModule } from './shared/components';
import { UnauthenticatedContentModule } from './unauthenticated-content';
import { AppRoutingModule } from './app-routing.module';
import {CoreModule} from "./core/core.module";
import {DialogsModule} from "./dialogs/dialogs.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SideNavOuterToolbarModule,
    SideNavInnerToolbarModule,
    SingleCardModule,
    FooterModule,
    ChangePasswordFormModule,
    LoginFormModule,
    PopupDialogModule,
    UnauthenticatedContentModule,
    AppRoutingModule,
    CoreModule,
    DialogsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
