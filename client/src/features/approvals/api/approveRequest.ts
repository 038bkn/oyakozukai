import { apiFetch } from "../../../shared/api/fetcher";
import { API_BASE_URL } from "../../../shared/apiBase";
import type { ApprovalResponse } from "../../../shared/types/approval";

export async function approveRequest(requestId: number, approverId = 1): Promise<ApprovalResponse> {
  return apiFetch<ApprovalResponse>(`${API_BASE_URL}/approvals/${requestId}`, {
    method: "POST",
    body: JSON.stringify({
      approver_user_id: approverId,
      status: "approved",
    }),
  });
}
