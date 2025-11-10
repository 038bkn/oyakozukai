import { useEffect, useState } from "react";
import type { Transaction } from "../../../shared/types/transaction";
import { getTransactions } from "../api/getTransactions";

export const useHistory = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getTransactions()
      .then((res) => setTransactions(res))
      .catch(() => setError("取得に失敗しました"))
      .finally(() => setLoading(false));
  }, []);

  return { transactions, loading, error };
};
