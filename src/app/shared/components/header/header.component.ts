import {Component, EventEmitter, Input, NgModule, OnInit, Output} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DxButtonModule} from 'devextreme-angular/ui/button';
import {DxToolbarModule} from 'devextreme-angular/ui/toolbar';

import {Router} from '@angular/router';
import {AuthService, DialogService} from "../../../core/services";
import {User} from "../../model/user";
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {DxTooltipModule} from "devextreme-angular";
import {SettingsDialogComponent} from "../../../dialogs/settings-dialog/settings-dialog.component";

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
  faRightFromBracket = faRightFromBracket

  @Output()
  menuToggle = new EventEmitter<boolean>();

  @Input()
  menuToggleEnabled = false;

  @Input()
  title!: string;

  user: User | undefined | null; //= {login: '', role: Role.printer, token: null, fullName: '', mustResetPassword: "False"};

  constructor(private authService: AuthService, public dialogService: DialogService, private router: Router) {
    this.showSettings = this.showSettings.bind(this);
  }

  ngOnInit() {
    this.user = this.authService.currentUserValue;
  }

  toggleMenu = () => {
    this.menuToggle.emit();
  }

  showSettings(){
    this.dialogService.showDialog(SettingsDialogComponent,'Настройки');
  }
}

@NgModule({
  imports: [
    CommonModule,
    DxButtonModule,
    DxToolbarModule,
    FontAwesomeModule,
    DxTooltipModule
  ],
  declarations: [HeaderComponent],
  exports: [HeaderComponent]
})
export class HeaderModule {
}
