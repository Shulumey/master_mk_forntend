import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginFormComponent, ChangePasswordFormComponent } from './shared/components';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { TasksComponent } from './pages/tasks/tasks.component';
import {
  DxButtonModule,
  DxDataGridModule,
  DxDropDownButtonModule,
  DxFormModule,
  DxToolbarModule
} from 'devextreme-angular';
import {CoreModule} from "./core/core.module";
import {AuthGuardService} from "./core/services";
import {APP_ROUTES} from "./core/constants/app.routes";
import {ProductcardsComponent} from "./pages/productcards/productcards.component";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";

const routes: Routes = [
  {
    path: '',
    component: ProductcardsComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: APP_ROUTES.PRODUCT_CARD,
    component: ProductcardsComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: APP_ROUTES.LOGIN,
    component: LoginFormComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: APP_ROUTES.CHANGE_PASSWORD,
    component: ChangePasswordFormComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: '**',
    redirectTo: '/',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true}), DxDataGridModule, DxFormModule, CoreModule, DxToolbarModule, DxButtonModule, FontAwesomeModule, DxDropDownButtonModule],
  providers: [AuthGuardService],
  exports: [RouterModule],
  declarations: [
    HomeComponent,
    ProfileComponent,
    TasksComponent,
    ProductcardsComponent
  ]
})
export class AppRoutingModule { }
