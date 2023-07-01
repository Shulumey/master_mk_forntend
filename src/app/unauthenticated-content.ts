import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SingleCardModule } from 'src/app/layouts';
import { Router } from '@angular/router';
import {APP_ROUTES} from "./core/constants/app.routes";

@Component({
  selector: 'app-unauthenticated-content',
  template: `
    <app-single-card [title]="title" [description]="description">
      <router-outlet></router-outlet>
    </app-single-card>
  `,
  styles: [`
    :host {
      width: 100%;
      height: 100%;
    }
  `]
})
export class UnauthenticatedContentComponent {

  constructor(private router: Router) {

  }

  get title() {
    const path = this.router.url.split('/')[1];
    switch (path) {
      case APP_ROUTES.LOGIN: return 'Аутентификация';
      case APP_ROUTES.CHANGE_PASSWORD: return 'Смена пароля';
      default: return 'fwesf';
    }
  }

  get description() {
    const path = this.router.url.split('/')[1];
    switch (path) {
      case APP_ROUTES.CHANGE_PASSWORD: return 'Please enter the email address that you used to register, and we will send you a link to reset your password via Email.';
      default: return '';
    }
  }
}
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SingleCardModule,
  ],
  declarations: [UnauthenticatedContentComponent],
  exports: [UnauthenticatedContentComponent]
})
export class UnauthenticatedContentModule { }
