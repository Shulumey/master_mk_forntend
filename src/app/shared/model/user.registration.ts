import {Role} from "./enums";

export interface UserRegistration {
  login: string;
  password: string;
  fullName: string;
  isActive: boolean;
  role: Role
}
