import {environment} from "../../../environments/environment";

const BASE_ADDRESS: string = environment.apiUrl;

export const API_URLS: {
  LOGIN: string,
  REGISTER: string,
  CHANGE_PASS: string,
  LICENSE: string,
  GET_CERTIFICATES: string,
} = {
  LOGIN: `${BASE_ADDRESS}/auth/login`,
  REGISTER: `${BASE_ADDRESS}/auth/register`,
  CHANGE_PASS:`${BASE_ADDRESS}/auth/reset`,
  LICENSE:`${BASE_ADDRESS}/license`,
  GET_CERTIFICATES: `${BASE_ADDRESS}/certificate`
}


