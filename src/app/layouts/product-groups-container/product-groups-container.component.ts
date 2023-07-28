import {Component, NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {ActivatedRoute, Router, RouterModule} from "@angular/router";
import {DxFormModule} from "devextreme-angular/ui/form";
import {DxLoadIndicatorModule} from "devextreme-angular/ui/load-indicator";
import {DxPopupModule, DxTabsModule, DxValidationGroupModule} from "devextreme-angular";
import {AppInfoService, LayoutService} from "../../core/services";
import {ProductGroup} from "../../shared/model/license";
import {filter, map} from "rxjs/operators";
import {PopupDialogModule} from "../../shared/components";
import {SideNavOuterToolbarModule} from "../side-nav-outer-toolbar/side-nav-outer-toolbar.component";
import {NgDestroyComponent} from "../../core/ng.destroy.component";
import {getProductGroupRoute, PRODUCT_GROUP_ICONS} from "../../core/constants/app.routes";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {IconProp} from "@fortawesome/fontawesome-svg-core";

@Component({
  selector: 'app-product-groups-container',
  templateUrl: './product-groups-container.component.html',
  styleUrls: ['./product-groups-container.component.scss']
})

export class ProductGroupsContainerComponent extends NgDestroyComponent {

  productGroupsTabs: Tab[]

  public get selectedTab(): Tab {
    return this._get("selectedTab")
  }

  public set selectedTab(value: Tab) {
    this._set("selectedTab", value);
  }

  constructor(layoutService: LayoutService, private appService: AppInfoService, private router: Router, route: ActivatedRoute) {
    super(layoutService)
    appService.onLicenseReceived().pipe(
      filter(license => !!license?.availableGroups),
      map(license => license?.availableGroups.map(p => {
        return <Tab>{
          text: p.display,
          productGroup: p,
          icon: PRODUCT_GROUP_ICONS.get(p.name)
        };
      }))
    ).subscribe(data => {
      this.productGroupsTabs = data || []
      this.selectedTab = this.productGroupsTabs[1];
    });

    this.$watch("selectedTab", ()=>{
      this.layoutService.changeProductGroup(this.selectedTab.productGroup);
      this.router.navigate([getProductGroupRoute(this.selectedTab.productGroup!)])
    });
  }

}

interface Tab {
  productGroup: ProductGroup
  text: string,
  icon: IconProp
}

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    DxFormModule,
    DxLoadIndicatorModule,
    DxPopupModule,
    DxValidationGroupModule,
    DxTabsModule,
    PopupDialogModule,
    SideNavOuterToolbarModule,
    FontAwesomeModule
  ],
  declarations: [ProductGroupsContainerComponent],
  exports: [ProductGroupsContainerComponent]
})
export class ProductGroupsContainerModule {
}
