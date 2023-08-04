import {Role} from "./enums";

export interface User {
  login: string;
  fullName: string;
  role: Role;
  mustResetPassword: string
  token: string | null
}
