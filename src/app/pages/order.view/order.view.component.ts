import {Component, OnInit} from '@angular/core';
import {LayoutService} from "../../core/services";
import {ActivatedRoute, Router} from "@angular/router";
import {switchMap} from "rxjs";
import {HttpService} from "../../core/services/http.service";
import {filter, map} from "rxjs/operators";
import {OrderCodes} from "../../shared/model/orders";
import {PRODUCT_GROUP_API_URLS} from "../../core/constants/api.urls";
import {DisplayEnumItem} from "../../shared/model/display.enum.item";
import {OrderStatus, PaymentType, ReleaseType} from "../../shared/model/enums";
import {DISPLAY_ENUM_MAP} from "../../shared/model/display.enum.map";
import {
  faCirclePlus,
  faFileSignature,
  faTrash,
  faXmark
} from "@fortawesome/free-solid-svg-icons";
import {faFloppyDisk} from "@fortawesome/free-regular-svg-icons";
import {NgPageComponent} from "../../core/ng.page.component";
import {OUTCOME_APP_ROUTES} from "../../core/constants/app.routes";

@Component({
  selector: 'app-order.view',
  templateUrl: './order.view.component.html',
  styleUrls: ['./order.view.component.scss']
})
export class OrderViewComponent extends NgPageComponent implements OnInit {

  _order: OrderCodes;
  releaseTypes: DisplayEnumItem<ReleaseType>[] | []
  paymentTypes: DisplayEnumItem<PaymentType>[] | []

  public get orderStatus(): string {
    return DISPLAY_ENUM_MAP.ORDER_STATUS.find(s => s.Value === this.order.status)?.Display || "не удалось определить"
  }

  public get order(): OrderCodes {
    return this._get("order");
  }

  public set order(val: OrderCodes) {
    this._set("order", val);
  }

  constructor(layoutService: LayoutService, router: Router, private route: ActivatedRoute, private http: HttpService) {
    super(layoutService, router);

    this.releaseTypes = DISPLAY_ENUM_MAP.RELEASE_TYPE;
    this.paymentTypes = DISPLAY_ENUM_MAP.PAYMENT_TYPE;
  }

  override onCanSave(): boolean {
    return this.order.orderItems.length > 0;
  }

  override getValidationProps(): string[] {
    return ["order"]
  }

  onFormChanged(e:any){
    this.raiseChange(["order"]);
  }

  ngOnInit(): void {
    this.appendToSubs(this.route.paramMap.pipe(
      map(params => params.get("id")),
      filter(id => id !== null && +id > 0),
      switchMap(orderId => this.http.get<OrderCodes>(PRODUCT_GROUP_API_URLS.GET_ORDER(this.layoutService.currentProductGroup!, Number(orderId)))),
    ).subscribe(order => this.order = order!))

    this.appendToSubs(this.route.paramMap.pipe(
      map(params => params.get("id")),
      filter(id => id === null || +id <= 0),
    ).subscribe(_ => this.order = {
      id: 0,
      status: OrderStatus.Created,
      releaseType: ReleaseType.ProducedInRussia,
      paymentType: PaymentType.Utilization,
      orderItems: [],
    }))
  }

  protected readonly faXmark = faXmark;
  protected readonly faFloppyDisk = faFloppyDisk;
  protected readonly faFileSignature = faFileSignature;
  protected readonly faCirclePlus = faCirclePlus;
  protected readonly faTrash = faTrash;
  public readonly OUTCOME_APP_ROUTES = OUTCOME_APP_ROUTES;
}
