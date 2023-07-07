import {Component, EventEmitter, Input, NgModule, OnInit, Output} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DxButtonModule} from 'devextreme-angular/ui/button';
import {DxToolbarModule} from 'devextreme-angular/ui/toolbar';

import {Router} from '@angular/router';
import {AppInfoService, AuthService, DialogService} from "../../../core/services";
import {User} from "../../model/user";
import {faRightFromBracket} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {DxTooltipModule} from "devextreme-angular";
import {SettingsDialogComponent} from "../../../dialogs/settings-dialog/settings-dialog.component";
import {License} from "../../model/license";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
  faRightFromBracket = faRightFromBracket
  licenseSub: Subscription;

  @Output()
  menuToggle = new EventEmitter<boolean>();

  @Input()
  menuToggleEnabled = false;

  @Input()
  title!: string;

  user: User | undefined | null;
  license: License | null;

  constructor(private authService: AuthService, public dialogService: DialogService, private appService: AppInfoService, private router: Router) {
    this.showSettings = this.showSettings.bind(this);
    this.licenseSub = this.appService.onLicenseReceived().subscribe(data => this.license = data);
  }

  ngOnInit() {
    this.user = this.authService.currentUserValue;
  }

  toggleMenu = () => {
    this.menuToggle.emit();
  }

  showSettings() {
    this.dialogService.showDialog(SettingsDialogComponent, 'Настройки', undefined, undefined, 400, 500);
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
