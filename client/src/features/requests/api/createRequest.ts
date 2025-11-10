import { apiFetch } from "../../../shared/api/fetcher";
import type { Request } from "../../../shared/types/request";

export async function createRequest(input: {
  child_user_id: number;
  amount: number;
  reason: string;
}): Promise<Request> {
  return await apiFetch<Request>("http://localhost:3000/requests", {
    method: "POST",
    body: JSON.stringify(input),
  });
}
