import { apiFetch } from "../../../shared/api/fetcher";
import { API_BASE_URL } from "../../../shared/apiBase";
import type { Request } from "../../../shared/types/request";

export async function createRequest(input: {
  child_user_id: number;
  amount: number;
  reason: string;
}): Promise<Request> {
  return await apiFetch<Request>(`${API_BASE_URL}/requests`, {
    method: "POST",
    body: JSON.stringify(input),
  });
}
