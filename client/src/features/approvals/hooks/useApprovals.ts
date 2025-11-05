import { useCallback, useEffect, useState } from "react";
import type { Request } from "../../../shared/types/request";
import { approveRequest } from "../api/approveRequest";
import { getRequestsForParent } from "../api/getRequestsForParent";
import { rejectRequest } from "../api/rejectRequest";

export const useApprovals = () => {
  const [data, setData] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 一覧取得
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getRequestsForParent();
      setData(res);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("申請の取得に失敗しました");
    } finally {
      setLoading(false);
    }
  }, []);

  // 承認
  const handleApprove = async (id: number) => {
    try {
      await approveRequest(id);
      setData((prev) => prev.filter((r) => r.request_id !== id));
    } catch (err) {
      console.error(err);
      alert("承認に失敗しました");
    }
  };

  // 却下
  const handleReject = async (id: number) => {
    try {
      await rejectRequest(id);
      setData((prev) => prev.filter((r) => r.request_id !== id));
    } catch (err) {
      console.error(err);
      alert("却下に失敗しました");
    }
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, handleApprove, handleReject, refetch: fetchData };
};
