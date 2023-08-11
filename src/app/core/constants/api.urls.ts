import {environment} from "../../../environments/environment";
import {ProductGroup} from "../../shared/model/license";

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

export const PRODUCTS_API_URLS: {
  GET_PRODUCTS: (productGroup: ProductGroup) => string,
  LOAD_PRODUCTS: (productGroup: ProductGroup) => string,
  ORDERS: (productGroup: ProductGroup) => string,
  GET_ORDER: (productGroup: ProductGroup, orderId: number) => string,
} = {
  GET_PRODUCTS: (productGroup) => `${BASE_ADDRESS}/${productGroup.name}/products`,
  LOAD_PRODUCTS: (productGroup) => `${BASE_ADDRESS}/${productGroup.name}/products/load`,
  ORDERS: (productGroup) => `${BASE_ADDRESS}/${productGroup.name}/order`,
  GET_ORDER: (productGroup, orderId) => `${BASE_ADDRESS}/${productGroup.name}/order/${orderId}`,
}

export const ORDERS_API_URLS: {
  ORDERS: (productGroup: ProductGroup) => string,
  GET_ORDER: (productGroup: ProductGroup, orderId: number) => string,
} = {
  ORDERS: (productGroup) => `${BASE_ADDRESS}/${productGroup.name}/order`,
  GET_ORDER: (productGroup, orderId) => `${BASE_ADDRESS}/${productGroup.name}/order/${orderId}`,
}


