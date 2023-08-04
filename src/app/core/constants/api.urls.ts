import {environment} from "../../../environments/environment";
import {ProductGroup} from "../../shared/model/license";
import {SUPPORT_PRODUCT_GROUPS} from "./product.groups";

const BASE_ADDRESS: string = environment.apiUrl;

export const API_URLS: {
  LOGIN: string,
  REGISTER: string,
  CHANGE_PASS: string,
  LICENSE: string,
  GET_CERTIFICATES: string,
  CONFIGURATION: string,
} = {
  LOGIN: `${BASE_ADDRESS}/auth/login`,
  REGISTER: `${BASE_ADDRESS}/auth/register`,
  CHANGE_PASS: `${BASE_ADDRESS}/auth/reset`,
  LICENSE: `${BASE_ADDRESS}/license`,
  GET_CERTIFICATES: `${BASE_ADDRESS}/certificate`,
  CONFIGURATION: `${BASE_ADDRESS}/configuration`,
}

export const PRODUCT_GROUP_API_URLS: {
  GET_PRODUCTS: (productGroup: ProductGroup) => string,
  LOAD_PRODUCTS: (productGroup: ProductGroup) => string,
  GET_ORDERS: (productGroup: ProductGroup) => string,
  GET_ORDER: (productGroup: ProductGroup, orderId: number) => string,
  CREATE_ORDER: (productGroup: ProductGroup) => string,
} = {
  GET_PRODUCTS: (productGroup) => `${BASE_ADDRESS}/${productGroup.name}/products`,
  LOAD_PRODUCTS: (productGroup) => `${BASE_ADDRESS}/${productGroup.name}/products/load`,
  GET_ORDERS: (productGroup) => `${BASE_ADDRESS}/${productGroup.name}/order/all`,
  CREATE_ORDER: (productGroup) => `${BASE_ADDRESS}/${productGroup.name}/order/create`,
  GET_ORDER: (productGroup, orderId) => `${BASE_ADDRESS}/${productGroup.name}/order/${orderId}`,
}


