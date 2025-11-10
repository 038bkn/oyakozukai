import { apiFetch } from "../../../shared/api/fetcher";
import type { Transaction } from "../../../shared/types/transaction";

export async function getTransactions(): Promise<Transaction[]> {
  const data = await apiFetch<Transaction[]>("http://localhost:3000/transactions");
  return data.map((t) => ({
    ...t,
    amount: Number(t.amount),
  }));
}
