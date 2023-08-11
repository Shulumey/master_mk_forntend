import {OrderProductStatus, OrderStatus, PaymentType, ReleaseType} from "./enums";
import {PackageType} from "./enums/package.type";

export interface DisplayEnumItem<TEnum extends OrderStatus | ReleaseType | PaymentType | PackageType | OrderProductStatus> {
  value: TEnum,
  display: string
}
