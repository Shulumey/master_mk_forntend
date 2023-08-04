import {ProductGroup} from "../../shared/model/license";
import {SUPPORT_PRODUCT_GROUPS} from "./product.groups";
import {faBottleWater, faBeer, faGlassWaterDroplet} from "@fortawesome/free-solid-svg-icons";
import {IconProp} from "@fortawesome/fontawesome-svg-core";

export const APP_ROUTES: {
  LOGIN: string,
  CHANGE_PASSWORD: string,
  CREATE_ACCOUNT: string,
  PRODUCT_CARD: string,
  PACK_LINES: string,
  ORDERS: string,
  ORDER_VIEW: string,
  AGGREGATION_REPORTS: string,
  ROOT: string
} = {
  LOGIN: "login",
  CHANGE_PASSWORD: "change-password",
  CREATE_ACCOUNT: "create-account",
  PRODUCT_CARD: "product-cards",
  ORDERS: "orders",
  ORDER_VIEW: "order",
  AGGREGATION_REPORTS: "aggregation-reports",
  PACK_LINES: "pack-lines",
  ROOT: "/"
}

export const OUTCOME_APP_ROUTES: {
  VIEW_ORDER: (productGroup: ProductGroup, id?: number) => string,
} = {
  VIEW_ORDER: (productGroup, id) => id ? `/${getProductGroupRoute(productGroup)}/order?id=${id}` : `/${getProductGroupRoute(productGroup)}/order`
}

export const ROUTS_PRODUCT_GROUPS: {
  WATER: string,
  SOFT_DRINKS: string,
  BEER_ZERO: string
} = {
  WATER: "water",
  BEER_ZERO: "beer-zero",
  SOFT_DRINKS: "soft-drinks"
}

export const PRODUCT_GROUP_ICONS: Map<string, IconProp> = new Map<string, IconProp>([
  [SUPPORT_PRODUCT_GROUPS.WATER, faBottleWater],
  [SUPPORT_PRODUCT_GROUPS.SOFT_DRINKS, faGlassWaterDroplet],
  [SUPPORT_PRODUCT_GROUPS.BEER_ZERO, faBeer]
]);


export function getProductGroupRoute(productGroup: ProductGroup): string {
  switch (productGroup.name) {
    case SUPPORT_PRODUCT_GROUPS.WATER:
      return ROUTS_PRODUCT_GROUPS.WATER;
    case SUPPORT_PRODUCT_GROUPS.BEER_ZERO:
      return ROUTS_PRODUCT_GROUPS.BEER_ZERO;
    case SUPPORT_PRODUCT_GROUPS.SOFT_DRINKS:
      return ROUTS_PRODUCT_GROUPS.SOFT_DRINKS;
    default:
      return APP_ROUTES.ROOT;
  }

}
