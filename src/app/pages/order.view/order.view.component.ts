import {Component, OnInit} from '@angular/core';
import {DialogService, LayoutService} from "../../core/services";
import {ActivatedRoute, Router} from "@angular/router";
import {combineLatest, combineLatestAll, iif, mergeMap, switchMap, tap} from "rxjs";
import {HttpService} from "../../core/services/http.service";
import {filter, map} from "rxjs/operators";
import {OrderCodes, OrderItem} from "../../shared/model/orders";
import {DisplayEnumItem} from "../../shared/model/display.enum.item";
import {OrderStatus, PaymentType, ReleaseType} from "../../shared/model/enums";
import {DISPLAY_ENUM_MAP} from "../../shared/model/display.enum.map";
import {faCirclePlus, faFileSignature, faTrash, faXmark} from "@fortawesome/free-solid-svg-icons";
import {faFloppyDisk} from "@fortawesome/free-regular-svg-icons";
import {NgPageComponent} from "../../core/ng.page.component";
import {ProductOrderDialogComponent} from "../../dialogs/product-order-dialog/product-order-dialog.component";
import {confirm} from "devextreme/ui/dialog";
import {ORDERS_API_URLS, OUTCOME_APP_ROUTES} from "../../core/constants";
import {ReturnStatement} from "@angular/compiler";

@Component({
  selector: 'app-order.view',
  templateUrl: './order.view.component.html',
  styleUrls: ['./order.view.component.scss']
})
export class OrderViewComponent extends NgPageComponent implements OnInit {

  canDelete: boolean = false;
  releaseTypes: DisplayEnumItem<ReleaseType>[] | []
  paymentTypes: DisplayEnumItem<PaymentType>[] | []

  public get orderStatus(): string {
    return DISPLAY_ENUM_MAP.ORDER_STATUS.find(s => s.value === this.order.status)?.display || "не удалось определить"
  }

  public get order(): OrderCodes {
    return this._get("order");
  }

  public set order(val: OrderCodes) {
    this._set("order", val);
  }

  public get selectedItems(): OrderItem[] {
    return this._get("selectedItems");
  }

  public set selectedItems(value: OrderItem[]) {
    this._set("selectedItems", value);
  }

  constructor(layoutService: LayoutService,
              router: Router,
              public dialogService: DialogService,
              private route: ActivatedRoute,
              private http: HttpService) {
    super(layoutService, router);
    this.openProduct = this.openProduct.bind(this);
    this.releaseTypes = DISPLAY_ENUM_MAP.RELEASE_TYPE;
    this.paymentTypes = DISPLAY_ENUM_MAP.PAYMENT_TYPE;

    this.$watch("selectedItems", (newVal, oldVal) => {
      this.canDelete = (<Array<OrderItem>>newVal).length == 1;
    })
  }

  override onCanSave(): boolean {
    return this.order.status == OrderStatus.Created && this.order.orderItems.length > 0;
  }

  override getValidationProps(): string[] {
    return ["order"]
  }

  override onCanEdit() {
    return this.order.status == OrderStatus.Created;
  }

  onFormChanged(e: any) {
    this.raiseChange(["order"]);
  }

  async openProduct(e?: any) {
    let selectedOrderItem = e && this.selectedItems && this.selectedItems.length > 0 ? {...this.selectedItems[0]} : undefined;
    let product = await this.dialogService.showDialog<ProductOrderDialogComponent, OrderItem, unknown>(ProductOrderDialogComponent, "Добавление продукции в заказ", undefined, selectedOrderItem, {
      width: 400
    });
    if (product) {
      let index = this.order.orderItems.findIndex(x => x.productId == product.productId);
      if (index > -1) {
        this.order.orderItems[index] = product;
      } else {
        this.order.orderItems.push(product);
      }
      this.raiseChange(["order"]);
    }
  }

  override onSave() {
    this.appendToSubs(this.http.post(ORDERS_API_URLS.ORDERS(this.layoutService.currentProductGroup!), this.order)
      .subscribe(async _ => {
        this.layoutService.showSuccess("Заказ успешно сохранен");
        await this.router.navigate([OUTCOME_APP_ROUTES.VIEW_ORDERS(this.layoutService.currentProductGroup!)])
      }))
  }

  async deleteProduct() {
    if (await confirm(`Хотите удалить продукцию "${this.selectedItems[0].productName}"?`, "Удаление")) {
      this.order.orderItems = this.order.orderItems.filter(x => x.productId !== this.selectedItems[0].productId);
    }
  }

  ngOnInit(): void {
    this.appendToSubs(this.route.queryParams.pipe(
      map(params => params["id"]),
      switchMap(id => iif(() => id !== null && +id > 0,
        this.http.get<OrderCodes>(ORDERS_API_URLS.GET_ORDER(this.layoutService.currentProductGroup!, Number(id))),
        this.route.paramMap.pipe(
        map(_ => {
          return {
            id: 0,
            status: OrderStatus.Created,
            releaseType: ReleaseType.ProducedInRussia,
            paymentType: PaymentType.Utilization,
            orderItems: [],
          }
        })
      ))),
    ).subscribe(order => this.order = order!))
  }

  protected readonly faXmark = faXmark;
  protected readonly faFloppyDisk = faFloppyDisk;
  protected readonly faFileSignature = faFileSignature;
  protected readonly faCirclePlus = faCirclePlus;
  protected readonly faTrash = faTrash;
  public readonly OUTCOME_APP_ROUTES = OUTCOME_APP_ROUTES;
}
