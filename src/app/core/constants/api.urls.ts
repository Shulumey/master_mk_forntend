import {environment} from "../../../environments/environment";

const BASE_ADDRESS: string = environment.apiUrl;

export const API_URLS: {
  LOGIN: string,
  REGISTER: string,
  CHANGE_PASS: string,
  LICENSE: string
} = {
  LOGIN: `${BASE_ADDRESS}/User/login`,
  REGISTER: `${BASE_ADDRESS}/User/register`,
  CHANGE_PASS:`${BASE_ADDRESS}/User/reset`,
  LICENSE:`${BASE_ADDRESS}/License`
}


