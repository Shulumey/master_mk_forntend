import {AfterViewInit, Component} from '@angular/core';
import {NgDialogComponent} from "../../core/ng.dialog.component";
import {DialogService, LayoutService} from "../../core/services";
import {OrderItem} from "../../shared/model/orders";
import {OrderProductStatus, PackageType} from 'src/app/shared/model/enums';
import {DisplayEnumItem} from "../../shared/model/display.enum.item";
import {ProductSelectionDialogComponent} from "../product-selection-dialog/product-selection-dialog.component";
import {DISPLAY_ENUM_MAP} from "../../shared/model/display.enum.map";

@Component({
  selector: 'app-product-order-dialog',
  templateUrl: './product-order-dialog.component.html',
  styleUrls: ['./product-order-dialog.component.scss']
})
export class ProductOrderDialogComponent extends NgDialogComponent implements AfterViewInit {

  maskRules: any;
  orderItem: OrderItem;
  packTypes: DisplayEnumItem<PackageType>[] | []
  canChangeProduct: boolean = true;

  protected get selectedProduct(): string {
    return this._get("selectedProduct");
  }

  protected set selectedProduct(value: string) {
    this._set("selectedProduct", value);
  }

  protected get selectedPackType(): PackageType {
    return this._get("selectedPackType");
  }

  protected set selectedPackType(value: PackageType) {
    this._set("selectedPackType", value);
  }

  protected get totalCount(): string {
    return this._get("totalCount");
  }

  protected set totalCount(value: string) {
    this._set("totalCount", value);
  }

  constructor(layoutService: LayoutService, public dialogService: DialogService) {
    super(layoutService);
    this.packTypes = DISPLAY_ENUM_MAP.PACKAGE_TYPE(layoutService.currentProductGroup!);
    this.orderItem = {
      id: 0,
      orderId: 0,
      packType: PackageType.Unit,
      expiredDate: null,
      totalCodes: 0,
      countLeft: 0,
      productId: 0,
      isExhausted: false,
      status: OrderProductStatus.Pending,
      totalPassed: 0,
      unavailableCodes: 0
    }

    this.maskRules = {d: /[02-9]/}
  }

  async onShowProductSelection() {
    let selectedProduct = await this.dialogService.showDialog<ProductSelectionDialogComponent, any, unknown>(ProductSelectionDialogComponent, "Продукция", "productsAddToOrderDialog", null, {
      width: 800
    });
    if (selectedProduct) {
      this.selectedProduct = selectedProduct.name;
      this.orderItem.productId = selectedProduct.id;
      this.orderItem.productName = selectedProduct.name;
      this.orderItem.gtin = selectedProduct.gtin;

    }
  }

  override onConfirm() {
    this.orderItem.totalCodes = Number(this.totalCount);
    this.orderItem.countLeft =  Number(this.totalCount);
    this.orderItem.packType = this.selectedPackType;

    this.resolver(this.orderItem);
    this.onClose();
  }

  ngAfterViewInit(): void {
    if (this.payload) {
      this.orderItem = this.payload as OrderItem;
      this.totalCount = String(this.orderItem.totalCodes);
      this.selectedProduct = this.orderItem?.productName || '';
      this.selectedPackType = this.orderItem.packType;

    }
    this.canChangeProduct = this.payload === undefined;
  }
}
