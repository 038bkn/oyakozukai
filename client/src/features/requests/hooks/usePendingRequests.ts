import { useEffect, useState } from "react";
import type { Request } from "../../../shared/types/request";
import { getPendingRequests } from "../api/getPendingRequests";

export const usePendingRequests = () => {
  const [data, setData] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const result = await getPendingRequests();
        setData(result);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return { data, loading, error };
};
