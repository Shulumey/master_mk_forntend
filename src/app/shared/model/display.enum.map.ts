import {DisplayEnumItem} from "./display.enum.item";
import {OrderProductStatus, OrderStatus, PackageType, PaymentType, ReleaseType} from "./enums";
import {ProductGroup} from "./license";
import {SUPPORT_PRODUCT_GROUPS} from "../../core/constants/product.groups";

export const DISPLAY_ENUM_MAP: {
  ORDER_STATUS: DisplayEnumItem<OrderStatus>[],
  RELEASE_TYPE: DisplayEnumItem<ReleaseType>[],
  PAYMENT_TYPE: DisplayEnumItem<PaymentType>[],
  ORDER_PRODUCT_STATUS: DisplayEnumItem<OrderProductStatus>[],
  PACKAGE_TYPE: (productGroup: ProductGroup) => DisplayEnumItem<PackageType>[]
} = {
  ORDER_STATUS: [
    {
      display: "Заказ создан",
      value: OrderStatus.Created
    },
    {
      display: "Заказ ожидает подтверждения",
      value: OrderStatus.Pending
    },
    {
      display: "Заказ отклонен",
      value: OrderStatus.Declined
    },
    {
      display: "Заказ подтверждён",
      value: OrderStatus.Approved
    },
    {
      display: "Заказ готов",
      value: OrderStatus.Ready
    },
    {
      display: "Заказ закрыт",
      value: OrderStatus.Closed
    }
  ],
  RELEASE_TYPE: [
    {
      display: "Производство в РФ",
      value: ReleaseType.ProducedInRussia
    },
    {
      display: "Ввезен в РФ",
      value: ReleaseType.Import
    }
  ],
  PAYMENT_TYPE: [
    {
      display: "Оплата по эмиссии",
      value: PaymentType.Emission
    },
    {
      display: "Оплата по нанесению",
      value: PaymentType.Utilization
    }
  ],
  ORDER_PRODUCT_STATUS: [
    {
      display: "Пул КМ находится в ожидании",
      value: OrderProductStatus.Pending
    },
    {
      display: "Пул создан",
      value: OrderProductStatus.Active
    },
    {
      display: "Пул не содержит больше кодов",
      value: OrderProductStatus.Exhausted
    },
    {
      display: "Пул более не доступен для работы",
      value: OrderProductStatus.Rejected
    },
    {
      display: "Пул закрыт",
      value: OrderProductStatus.Closed
    }
  ],
  PACKAGE_TYPE: (productGroup: ProductGroup) => {
    switch (productGroup.name) {
      case SUPPORT_PRODUCT_GROUPS.WATER:
      case SUPPORT_PRODUCT_GROUPS.BEER_ZERO:
      case SUPPORT_PRODUCT_GROUPS.SOFT_DRINKS: {
        return [
          {
            display: "Единица товара",
            value: PackageType.Unit
          },
          {
            display: "Групповая потребительская упаковка",
            value: PackageType.Group
          }]
      }
      default: {
        return []
      }
    }
  }
}
