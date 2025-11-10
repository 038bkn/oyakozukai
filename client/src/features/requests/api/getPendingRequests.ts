import { apiFetch } from "../../../shared/api/fetcher";
import type { Request } from "../../../shared/types/request";

export const getPendingRequests = async (): Promise<Request[]> => {
  return apiFetch<Request[]>("http://localhost:3000/requests/pending");
};
