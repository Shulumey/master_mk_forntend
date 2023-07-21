import {AfterViewInit, Component, HostBinding, OnInit} from '@angular/core';
import {AppInfoService, AuthService, LayoutService, ScreenService} from "./core/services";
import {NgDestroyComponent} from "./core/ng.destroy.component";
import notify from "devextreme/ui/notify";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends NgDestroyComponent implements AfterViewInit {
  @HostBinding('class') get getClass() {
    return Object.keys(this.screen.sizes).filter(cl => this.screen.sizes[cl]).join(' ');
  }

  constructor(private authService: AuthService, private screen: ScreenService, public appInfo: AppInfoService, layoutService:LayoutService) {
    super(layoutService)

    this.appendToSubs(this.layoutService.messages$.subscribe(value => notify({
      message: value.message,
      type: value.messageType,
      displayTime: value.duration,
      width: 400
    }, {
      position: this.messagePosition,
      direction: "up-stack"
    })));
  }

  isAuthenticated() {
    return this.authService.isLoggedIn;
  }

  ngAfterViewInit(): void {
    this.appInfo.loadLicense();
  }
}
