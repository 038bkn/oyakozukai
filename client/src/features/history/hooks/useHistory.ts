import { useEffect, useState } from "react";
import { getTransactions } from "../api/getTransactions";
import type { Transaction } from "../components/TransactionCard";

export const useHistory = () => {
  const [data, setData] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getTransactions()
      .then((res) => setData(res))
      .catch(() => setError("取得に失敗しました"))
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
};
