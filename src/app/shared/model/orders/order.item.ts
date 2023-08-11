import {OrderProductStatus, PackageType} from "../enums";

export interface OrderItem {
  id: number,
  status: OrderProductStatus,
  packType: PackageType
  totalCodes: number,
  totalPassed: number,
  countLeft: number,
  unavailableCodes: number,
  isExhausted: boolean,
  rejectionReason?: string,
  expiredDate: Date | null,
  gtin?: string,
  productName?: string
  productId: number,
  orderId: number
}
