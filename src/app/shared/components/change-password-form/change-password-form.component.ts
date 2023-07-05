import {CommonModule} from '@angular/common';
import {Component, NgModule, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterModule} from '@angular/router';
import {ValidationCallbackData} from 'devextreme/common';
import {DxFormModule} from 'devextreme-angular/ui/form';
import {DxLoadIndicatorModule} from 'devextreme-angular/ui/load-indicator';
import {AuthService, LayoutService} from "../../../core/services";
import {NgDestroyComponent} from "../../../core/ng.destroy.component";


@Component({
  selector: 'app-change-passsword-form',
  templateUrl: './change-password-form.component.html'
})
export class ChangePasswordFormComponent extends NgDestroyComponent implements OnInit {
  login: string;
  formData: any = {};

  constructor(private authService: AuthService, layoutService: LayoutService, private router: Router, private route: ActivatedRoute) {
    super(layoutService)
    this.login = '';
    this.messagePosition = "bottom center";
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.login = params['login'] || '';
    });
  }

  onSubmit(e: Event) {
    e.preventDefault();
    const {password, login} = this.formData;
    this.authService.changePassword(login, password);
  }

  confirmPassword = (e: ValidationCallbackData) => {
    return e.value === this.formData.password;
  }
}

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    DxFormModule,
    DxLoadIndicatorModule
  ],
  declarations: [ChangePasswordFormComponent],
  exports: [ChangePasswordFormComponent]
})
export class ChangePasswordFormModule {
}
