import {Component, EventEmitter, Input, NgModule, OnInit, Output} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DxButtonModule} from 'devextreme-angular/ui/button';
import {DxToolbarModule} from 'devextreme-angular/ui/toolbar';

import {Router} from '@angular/router';
import {AuthService} from "../../../core/services";
import {User} from "../../model/user";
import {Role} from "../../model/role";

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
  @Output()
  menuToggle = new EventEmitter<boolean>();

  @Input()
  menuToggleEnabled = false;

  @Input()
  title!: string;

  user: User | null = {userName: '', role: Role.printer, token: null, fullName: ''};

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
    this.user = this.authService.currentUserValue;
  }

  toggleMenu = () => {
    this.menuToggle.emit();
  }
}

@NgModule({
  imports: [
    CommonModule,
    DxButtonModule,
    DxToolbarModule
  ],
  declarations: [HeaderComponent],
  exports: [HeaderComponent]
})
export class HeaderModule {
}
