import {CommonModule} from '@angular/common';
import {Component, NgModule} from '@angular/core';
import {Router, RouterModule} from '@angular/router';
import {DxFormModule} from 'devextreme-angular/ui/form';
import {DxLoadIndicatorModule} from 'devextreme-angular/ui/load-indicator';
import notify from 'devextreme/ui/notify';
import {AuthService, LayoutService} from "../../../core/services";
import {NgDestroyComponent} from "../../../core/ng.destroy.component";


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent extends NgDestroyComponent {
  formData: any = {};

  constructor(private authService: AuthService, layoutService: LayoutService, private router: Router) {
    super(layoutService)
    this.messagePosition = "bottom center";
  }

  onSubmit(e: Event) {
    e.preventDefault();
    const {login, password, rememberMe} = this.formData;

    this.authService.logIn(login, password, rememberMe);
    /* if (!result.isOk) {
       this.loading = false;
       notify(result.message, 'error', 2000);
     }*/
  }
}

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    DxFormModule,
    DxLoadIndicatorModule
  ],
  declarations: [LoginFormComponent],
  exports: [LoginFormComponent]
})
export class LoginFormModule {
}
