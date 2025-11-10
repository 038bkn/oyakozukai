import { apiFetch } from "../../../shared/api/fetcher";
import type { Request } from "../../../shared/types/request";

export async function getRequestsForParent(): Promise<Request[]> {
  const data = await apiFetch<Request[]>("http://localhost:3000/requests");
  return data.map((r) => ({
    ...r,
    amount: Number(r.amount),
  }));
}
