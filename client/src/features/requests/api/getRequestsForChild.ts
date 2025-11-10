import { apiFetch } from "../../../shared/api/fetcher";
import { API_BASE_URL } from "../../../shared/apiBase";
import type { Request } from "../../../shared/types/request";

export async function getRequestsForChild(childId: number): Promise<Request[]> {
  const data = await apiFetch<Request[]>(`${API_BASE_URL}/requests/child/${childId}`);
  return data.map((r) => ({
    ...r,
    amount: Number(r.amount),
  }));
}
