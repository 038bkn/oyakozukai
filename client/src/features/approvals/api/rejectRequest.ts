import { apiFetch } from "../../../shared/api/fetcher";
import type { ApprovalResponse } from "../../../shared/types/approval";

export async function rejectRequest(requestId: number, approverId = 1): Promise<ApprovalResponse> {
  return apiFetch<ApprovalResponse>(`http://localhost:3000/approvals/${requestId}`, {
    method: "POST",
    body: JSON.stringify({
      approver_user_id: approverId,
      status: "rejected",
    }),
  });
}
