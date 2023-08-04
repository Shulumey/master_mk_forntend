import {DisplayEnumItem} from "./display.enum.item";
import {OrderStatus, PaymentType, ReleaseType} from "./enums";

export const DISPLAY_ENUM_MAP: {
  ORDER_STATUS: DisplayEnumItem<OrderStatus>[],
  RELEASE_TYPE: DisplayEnumItem<ReleaseType>[],
  PAYMENT_TYPE: DisplayEnumItem<PaymentType>[]
} = {
  ORDER_STATUS: [
    {
      Display: "Заказ создан",
      Value: OrderStatus.Created
    },
    {
      Display: "Заказ ожидает подтверждения",
      Value: OrderStatus.Pending
    },
    {
      Display: "Заказ отклонен",
      Value: OrderStatus.Declined
    },
    {
      Display: "Заказ подтверждён",
      Value: OrderStatus.Approved
    },
    {
      Display: "Заказ готов",
      Value: OrderStatus.Ready
    },
    {
      Display: "Заказ закрыт",
      Value: OrderStatus.Closed
    }
  ],
  RELEASE_TYPE: [
    {
      Display: "Производство в РФ",
      Value: ReleaseType.ProducedInRussia
    },
    {
      Display: "Ввезен в РФ",
      Value: ReleaseType.Import
    }
  ],
  PAYMENT_TYPE: [
    {
      Display: "Оплата по эмиссии",
      Value: PaymentType.Emission
    },
    {
      Display: "Оплата по нанесению",
      Value: PaymentType.Utilization
    }
  ]
}
