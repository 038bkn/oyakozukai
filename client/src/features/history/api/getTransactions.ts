import { apiFetch } from "../../../shared/api/fetcher";
import { API_BASE_URL } from "../../../shared/apiBase";
import type { Transaction } from "../../../shared/types/transaction";

export async function getTransactions(): Promise<Transaction[]> {
  const data = await apiFetch<Transaction[]>(`${API_BASE_URL}/transactions`);
  return data.map((t) => ({
    ...t,
    amount: Number(t.amount),
  }));
}
