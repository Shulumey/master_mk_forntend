import {Component, ViewChild} from '@angular/core';
import {NgDestroyComponent} from "../../core/ng.destroy.component";
import {LayoutService} from "../../core/services";
import {faArrowsRotate, faPlus, faReceipt} from "@fortawesome/free-solid-svg-icons";
import {DxDataGridComponent} from "devextreme-angular";
import {createStore, CustomStore} from "devextreme-aspnet-data-nojquery";
import {faPaperPlane} from "@fortawesome/free-regular-svg-icons/faPaperPlane";
import {OUTCOME_APP_ROUTES, PRODUCTS_API_URLS} from "../../core/constants";
import {Router} from "@angular/router";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent extends NgDestroyComponent {
  dataSource: CustomStore;
  createOrderLink: string[]

  @ViewChild(DxDataGridComponent) dataGrid:DxDataGridComponent

  constructor(layoutService: LayoutService, private router : Router) {
    super(layoutService);

    this.createOrderLink = [OUTCOME_APP_ROUTES.VIEW_ORDER(this.layoutService.currentProductGroup!)]

    this.dataSource = createStore({
      key: "id",
      loadUrl: PRODUCTS_API_URLS.ORDERS(this.layoutService.currentProductGroup!)
    })

  }

  async onOpenOrder(e: any) {
   await this.router.navigate([OUTCOME_APP_ROUTES.VIEW_ORDER(this.layoutService.currentProductGroup!)], {queryParams: {id: e.data.id}})
  }

  async onRefresh(e?: any){
    await this.dataGrid.instance.refresh();
  }

  protected readonly faPlus = faPlus;
  protected readonly faArrowsRotate = faArrowsRotate;
  protected readonly faPaperPlane = faPaperPlane;
  protected readonly faReceipt = faReceipt;
}
