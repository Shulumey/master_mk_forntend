import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {
  SideNavOuterToolbarModule,
  SideNavInnerToolbarModule,
  SingleCardModule,
  ProductGroupsContainerModule
} from './layouts';
import {
  FooterModule,
  ChangePasswordFormModule,
  LoginFormModule,
  PopupDialogModule, HeaderModule,
} from './shared/components';
import { UnauthenticatedContentModule } from './unauthenticated-content';
import { AppRoutingModule } from './app-routing.module';
import {CoreModule} from "./core/core.module";
import {DialogsModule} from "./dialogs/dialogs.module";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    SideNavOuterToolbarModule,
    SideNavInnerToolbarModule,
    SingleCardModule,
    FooterModule,
    ChangePasswordFormModule,
    LoginFormModule,
    PopupDialogModule,
    ProductGroupsContainerModule,
    UnauthenticatedContentModule,
    AppRoutingModule,
    CoreModule,
    DialogsModule,
    HeaderModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
