import {Role} from "./role";

export interface User {
  userName: string;
  fullName: string;
  role: Role;
  token: string
}
