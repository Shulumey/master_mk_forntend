import {Role} from "./role";

export interface UserRegistration {
  login: string;
  password: string;
  fullName: string;
  isActive: boolean;
  role: Role
}
