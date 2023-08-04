import {AfterViewInit, Component, ViewChild, ViewContainerRef} from '@angular/core';
import {HttpService} from "../../core/services/http.service";
import {DialogService, LayoutService} from "../../core/services";
import {faArrowsRotate, faArrowUpRightFromSquare, faBottleWater} from '@fortawesome/free-solid-svg-icons';
import {NgDestroyComponent} from "../../core/ng.destroy.component";
import {createStore, CustomStore} from "devextreme-aspnet-data-nojquery";
import {PRODUCT_GROUP_API_URLS} from "../../core/constants/api.urls";
import {GtinEntraceDialogComponent} from "../../dialogs/gtin-entrace-dialog/gtin-entrace-dialog.component";
import {DxDataGridComponent} from "devextreme-angular";

@Component({
  selector: 'app-productcards',
  templateUrl: './productcards.component.html',
  styleUrls: ['./productcards.component.scss']
})
export class ProductcardsComponent extends NgDestroyComponent implements AfterViewInit {
  faArrowUpRightFromSquare = faArrowUpRightFromSquare
  faArrowsRotate = faArrowsRotate;
  downloadsMenuItems: { name: string, display: string }[]
  dataSource: CustomStore;

  @ViewChild(DxDataGridComponent) dataGrid:DxDataGridComponent

  constructor(private httpService: HttpService, layoutService: LayoutService, private dialogService: DialogService) {
    super(layoutService);

    this.downloadsMenuItems = [
      {name: "ownCards", display: "Собственные карточки"},
      {name: "publicCards", display: "Публичные карточки по коду товара"},
      {name: "refreshCards", display: "Обновить информацию по существующим карточкам"}
    ]

    this.dataSource = createStore({
      key: "id",
      loadUrl: PRODUCT_GROUP_API_URLS.GET_PRODUCTS(this.layoutService.currentProductGroup!)
    })

  }

  async onRefresh(e?: any){
    await this.dataGrid.instance.refresh();
  }

  async onLoadProductItemClick(e: any) {
    switch (e.itemData.name) {
      case 'publicCards': {
        let gtin = await this.dialogService.showDialog<GtinEntraceDialogComponent, string>(GtinEntraceDialogComponent, undefined, false, false);
        this.httpService.post(PRODUCT_GROUP_API_URLS.LOAD_PRODUCTS(this.layoutService.currentProductGroup!),[gtin]).subscribe(async()=>{
           await this.onRefresh()
        })
        break;
      }
    }
  }

  ngAfterViewInit(): void {
  }

}
