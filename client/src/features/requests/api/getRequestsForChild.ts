import { apiFetch } from "../../../shared/api/fetcher";
import type { Request } from "../../../shared/types/request";

export async function getRequestsForChild(childId: number): Promise<Request[]> {
  const data = await apiFetch<Request[]>(`http://localhost:3000/requests/child/${childId}`);
  return data.map((r) => ({
    ...r,
    amount: Number(r.amount),
  }));
}
