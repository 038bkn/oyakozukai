import { apiFetch } from "../../../shared/api/fetcher";
import type { Request } from "../../../shared/types/request";

export async function getRequestsForParent(): Promise<Request[]> {
  const data = await apiFetch<Request[]>("${API_BASE_URL}/requests");
  return data.map((r) => ({
    ...r,
    amount: Number(r.amount),
  }));
}
