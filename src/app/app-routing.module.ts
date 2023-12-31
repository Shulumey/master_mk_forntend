import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginFormComponent, ChangePasswordFormComponent} from './shared/components';
import {
  DxButtonModule,
  DxDataGridModule,
  DxDropDownButtonModule,
  DxFormModule,
  DxToolbarModule
} from 'devextreme-angular';
import {CoreModule} from "./core/core.module";
import {AuthGuardService} from "./core/services";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {ProductGroupGuard} from "./core/services/product-group.guard";
import {OrdersComponent, OrderViewComponent, ProductcardsComponent} from "./pages";
import {APP_ROUTES, ROUTS_PRODUCT_GROUPS} from "./core/constants";
import {CodeMarksReceivedComponent} from "./pages/code-marks-received/code-marks-received.component";


const childRoutes: Routes = [
  {
    path: '',
    redirectTo: APP_ROUTES.PRODUCT_CARD,
    pathMatch: 'full'
  },
  {
    path: APP_ROUTES.PRODUCT_CARD,
    component: ProductcardsComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: APP_ROUTES.ORDERS,
    component: OrdersComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: APP_ROUTES.RECEIVED,
    component: CodeMarksReceivedComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: APP_ROUTES.ORDER_VIEW,
    component: OrderViewComponent,
    canActivate: [AuthGuardService]
  }
]

const productGroupsRoutes: Routes = [
  {
    path: ROUTS_PRODUCT_GROUPS.WATER,
    children: childRoutes,
    canActivate: [ProductGroupGuard]
  },
  {
    path: ROUTS_PRODUCT_GROUPS.BEER_ZERO,
    children: childRoutes,
    canActivate: [ProductGroupGuard]
  },
  {
    path: ROUTS_PRODUCT_GROUPS.SOFT_DRINKS,
    children: childRoutes,
    canActivate: [ProductGroupGuard]
  },
  {
    path: APP_ROUTES.LOGIN,
    component: LoginFormComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: APP_ROUTES.CHANGE_PASSWORD,
    component: ChangePasswordFormComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: '**',
    redirectTo: '/',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(productGroupsRoutes, {useHash: true}),
    DxDataGridModule,
    DxFormModule,
    CoreModule,
    DxToolbarModule,
    DxButtonModule,
    FontAwesomeModule,
    DxDropDownButtonModule],
  providers: [AuthGuardService],
  exports: [RouterModule],
  declarations: [
    ProductcardsComponent
  ]
})
export class AppRoutingModule {
}
