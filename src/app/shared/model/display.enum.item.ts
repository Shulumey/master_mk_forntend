import {OrderStatus, PaymentType, ReleaseType} from "./enums";

export interface DisplayEnumItem<TEnum extends OrderStatus | ReleaseType | PaymentType> {
  Value: TEnum,
  Display: string
}
