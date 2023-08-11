import {AfterViewInit, Component} from '@angular/core';
import {createStore, CustomStore} from "devextreme-aspnet-data-nojquery";
import {NgDialogComponent} from "../../core/ng.dialog.component";
import {LayoutService} from "../../core/services";
import {PRODUCTS_API_URLS} from "../../core/constants";

@Component({
  selector: 'app-product-selection-dialog',
  templateUrl: './product-selection-dialog.component.html',
  styleUrls: ['./product-selection-dialog.component.scss']
})
export class ProductSelectionDialogComponent extends NgDialogComponent implements AfterViewInit {
  dataSource: CustomStore;

  public get selectedProduct(): any[] {
    return this._get("selectedProduct")
  }

  public set selectedProduct(value) {
    this._set("selectedProduct", value);
  }

  constructor(layoutService: LayoutService) {
    super(layoutService);

    this.dialogButtons = [
      {
        type: "default",
        text: "Добавить",
        stylingMode: "contained",
        useSubmitBehavior: false,
        onClick: (e) => {
          if (this.onCanConfirm()) {
            this.onConfirm();
          }
        }
      },
      {
        type: "default",
        text: "Закрыть",
        stylingMode: "outlined",
        onClick: (e) => {
          if (this.onCanClose()) {
            this.onClose();
          }
        }
      }
    ]

    this.$watch("selectedProduct", ()=>{

    })
  }

  override onConfirm() {
    this.resolver(this.selectedProduct[0]);
    this.onClose();
  }

  override onCanConfirm(): boolean {
    return this.selectedProduct && this.selectedProduct.length > 0;
  }

  ngAfterViewInit(): void {
    this.dataSource = createStore({
      loadUrl: PRODUCTS_API_URLS.GET_PRODUCTS(this.layoutService.currentProductGroup!)
    })
  }
}
