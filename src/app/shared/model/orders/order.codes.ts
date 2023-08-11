import {OrderStatus, PaymentType, ReleaseType} from "../enums";
import {OrderItem} from "./order.item";

export interface OrderCodes {
  id: number,
  documentId?: string,
  releaseType: ReleaseType,
  paymentType: PaymentType,
  status: OrderStatus,
  productionOrderId?: string,
  orderItems: OrderItem[]
}
