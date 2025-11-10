import type { Approval } from "./approval";
import type { Request } from "./request";
import type { StandingOrder } from "./standingOrder";
import type { User } from "./user";

export type Transaction = {
  transaction_id: number;
  amount: number;
  transacted_at: string;
  sender_user_id: number;
  recipient_user_id: number;

  sender?: Pick<User, "user_id" | "user_name"> | null;
  recipient?: Pick<User, "user_id" | "user_name"> | null;
  approval?: Pick<Approval, "status"> | null;

  approval_id?: number | null;
  standing_order_id?: number | null;
  standing_order?: StandingOrder | null;
  request_id?: number | null;
  request?: Request | null;
};
