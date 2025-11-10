import { useEffect, useState } from "react";
import type { Request } from "../../../../shared/types/request";
import type { Transaction } from "../../../../shared/types/transaction";
import { getTransactions } from "../../../history/api/getTransactions";
import { getRequestsForChild } from "../../../requests/api/getRequestsForChild";

export const useChildHome = (childId: number) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [txData, reqData] = await Promise.all([
          getTransactions(),
          getRequestsForChild(childId),
        ]);
        setTransactions(txData);
        setRequests(reqData);
      } catch (err) {
        console.error(err);
        setError("データの取得に失敗しました");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [childId]);

  // 残高を計算（受け取った金額の合計）
  const balance = transactions.reduce((sum, t) => sum + Number(t.amount), 0);

  return { balance, transactions, requests, loading, error };
};
