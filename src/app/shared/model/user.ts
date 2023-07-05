import {Role} from "./role";

export interface User {
  login: string;
  fullName: string;
  role: Role;
  mustResetPassword: string
  token: string | null
}
