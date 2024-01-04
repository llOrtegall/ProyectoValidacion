import { Auth } from "./Auth.Interface";

export interface User extends Auth {
  name: string;
  description: string;
}