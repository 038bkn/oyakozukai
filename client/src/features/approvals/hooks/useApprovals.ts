import { useEffect, useState } from "react";
import type { Request } from "../../../shared/types/request";
import { getRequestsForParent } from "../api/getRequestsForParent";

export const useApprovals = () => {
  const [data, setData] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getRequestsForParent();
        setData(res);
      } catch (err) {
        console.error(err);
        setError("申請の取得に失敗しました");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return { data, loading, error };
};
