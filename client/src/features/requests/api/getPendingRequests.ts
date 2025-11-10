import { apiFetch } from "../../../shared/api/fetcher";
import { API_BASE_URL } from "../../../shared/apiBase";
import type { Request } from "../../../shared/types/request";

export const getPendingRequests = async (): Promise<Request[]> => {
  return apiFetch<Request[]>(`${API_BASE_URL}/requests/pending`);
};
