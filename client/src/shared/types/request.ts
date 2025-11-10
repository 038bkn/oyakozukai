import type { Approval } from "./approval";
import type { Transaction } from "./transaction";

export type Request = {
  request_id: number;
  child_user_id: number;
  amount: number;
  reason: string;
  requested_at: string;
  approval?: Approval | null;
  transaction?: Transaction | null;
};
