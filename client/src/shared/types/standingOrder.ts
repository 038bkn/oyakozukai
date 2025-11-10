import type { Interval } from "./enums";
import type { Transaction } from "./transaction";

export type StandingOrder = {
  standing_order_id: number;
  child_user_id: number;
  amount: number;
  name: string;
  interval: Interval;
  start_date: string;
  is_active: boolean;
  transactions?: Transaction[] | null;
};
