import {Component, OnInit} from '@angular/core';
import {NgDestroyComponent} from "../../core/ng.destroy.component";
import {LayoutService} from "../../core/services";
import {ActivatedRoute} from "@angular/router";
import {switchMap} from "rxjs";
import {HttpService} from "../../core/services/http.service";
import {filter, map} from "rxjs/operators";
import {OrderCodes} from "../../shared/model/orders";
import {PRODUCT_GROUP_API_URLS} from "../../core/constants/api.urls";
import {DisplayEnumItem} from "../../shared/model/display.enum.item";
import {OrderStatus, PaymentType, ReleaseType} from "../../shared/model/enums";
import {DISPLAY_ENUM_MAP} from "../../shared/model/display.enum.map";
import {
  faArrowsRotate,
  faCirclePlus,
  faFileSignature,
  faPencil,
  faPlus,
  faReceipt, faTrash,
  faXmark
} from "@fortawesome/free-solid-svg-icons";
import {faFloppyDisk} from "@fortawesome/free-regular-svg-icons";

@Component({
  selector: 'app-order.view',
  templateUrl: './order.view.component.html',
  styleUrls: ['./order.view.component.scss']
})
export class OrderViewComponent extends NgDestroyComponent implements OnInit {

  order: OrderCodes;
  releaseTypes: DisplayEnumItem<ReleaseType>[] | []
  paymentTypes: DisplayEnumItem<PaymentType>[] | []

  constructor(layoutService: LayoutService, private route: ActivatedRoute, private http: HttpService) {
    super(layoutService);

    this.releaseTypes = DISPLAY_ENUM_MAP.RELEASE_TYPE;
    this.paymentTypes = DISPLAY_ENUM_MAP.PAYMENT_TYPE;

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

  protected readonly faReceipt = faReceipt;
  protected readonly faPlus = faPlus;
  protected readonly faArrowsRotate = faArrowsRotate;
  protected readonly faXmark = faXmark;
  protected readonly faFloppyDisk = faFloppyDisk;
  protected readonly faPencil = faPencil;
  protected readonly faFileSignature = faFileSignature;
  protected readonly faCirclePlus = faCirclePlus;
  protected readonly faTrash = faTrash;
}
