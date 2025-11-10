import type { Role } from "./enums";

export type User = {
  user_id: number;
  user_name: string;
  role: Role;
  email: string;
  password_hash: string;
};
