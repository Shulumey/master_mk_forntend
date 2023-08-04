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

import {
    DevExtremeModule,
    DxButtonModule,
    DxDataGridModule,
    DxDropDownButtonModule,
    DxTemplateModule,
    DxToolbarModule
} from "devextreme-angular";
import {
    DxiColumnModule,
    DxiItemModule,
    DxoFilterRowModule,
    DxoPagingModule,
    DxoScrollingModule, DxoSelectionModule
} from "devextreme-angular/ui/nested";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {PagesModule} from "./pages/pages.module";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    SideNavOuterToolbarModule,
    SideNavInnerToolbarModule,
    PagesModule,
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
    HeaderModule,
    DxButtonModule,
    DxDataGridModule,
    DxDropDownButtonModule,
    DxTemplateModule,
    DxToolbarModule,
    DxiColumnModule,
    DxiItemModule,
    DxoFilterRowModule,
    DxoPagingModule,
    DxoScrollingModule,
    DxoSelectionModule,
    FontAwesomeModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
