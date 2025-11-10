import type { Status } from "./enums";
import type { Request } from "./request";
import type { Transaction } from "./transaction";
import type { User } from "./user";

export type Approval = {
  approval_id: number;
  request_id: number;
  approver_user_id: number;
  status: Status;
  decided_at: string;
  request?: Request | null;
  approver?: Pick<User, "user_name" | "user_id"> | null;
  transaction?: Transaction | null;
};

export interface ApprovalResponse {
  approval: Approval;
  transaction: Transaction;
}
