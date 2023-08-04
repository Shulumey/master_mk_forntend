import {Component, ViewChild} from '@angular/core';
import {NgDestroyComponent} from "../../core/ng.destroy.component";
import {LayoutService} from "../../core/services";
import {faArrowsRotate, faPlus, faReceipt} from "@fortawesome/free-solid-svg-icons";
import {DxDataGridComponent} from "devextreme-angular";
import {createStore, CustomStore} from "devextreme-aspnet-data-nojquery";
import {faPaperPlane} from "@fortawesome/free-regular-svg-icons/faPaperPlane";
import {PRODUCT_GROUP_API_URLS} from "../../core/constants/api.urls";
import {APP_ROUTES, getProductGroupRoute, OUTCOME_APP_ROUTES} from "../../core/constants/app.routes";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent extends NgDestroyComponent {
  dataSource: CustomStore;
  createOrderLink: string[]

  @ViewChild(DxDataGridComponent) dataGrid:DxDataGridComponent

  constructor(layoutService: LayoutService) {
    super(layoutService);

    this.createOrderLink = [OUTCOME_APP_ROUTES.VIEW_ORDER(this.layoutService.currentProductGroup!)]

    this.dataSource = createStore({
      key: "id",
      loadUrl: PRODUCT_GROUP_API_URLS.GET_ORDERS(this.layoutService.currentProductGroup!)
    })

  }

  async onRefresh(e?: any){
    await this.dataGrid.instance.refresh();
  }

  protected readonly faPlus = faPlus;
  protected readonly faArrowsRotate = faArrowsRotate;
  protected readonly faPaperPlane = faPaperPlane;
  protected readonly faReceipt = faReceipt;
}
