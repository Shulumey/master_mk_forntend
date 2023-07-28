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
  GET_PRODUCTS: string,
  LOAD_PRODUCTS: string
} = {
  LOGIN: `${BASE_ADDRESS}/auth/login`,
  REGISTER: `${BASE_ADDRESS}/auth/register`,
  CHANGE_PASS: `${BASE_ADDRESS}/auth/reset`,
  LICENSE: `${BASE_ADDRESS}/license`,
  GET_CERTIFICATES: `${BASE_ADDRESS}/certificate`,
  CONFIGURATION: `${BASE_ADDRESS}/configuration`,
  GET_PRODUCTS: `${BASE_ADDRESS}/products`,
  LOAD_PRODUCTS: `${BASE_ADDRESS}/products/load`,
}

export const PRODUCT_GROUP_API_URLS: {
  GET_PRODUCTS: Function,
  LOAD_PRODUCTS: Function
} = {
  GET_PRODUCTS: (productGroup: ProductGroup) => `${BASE_ADDRESS}/${productGroup.name}/products`,
  LOAD_PRODUCTS: (productGroup: ProductGroup) => `${BASE_ADDRESS}/${productGroup.name}/products/load`,
}


