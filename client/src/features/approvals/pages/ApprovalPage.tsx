import { Link } from "react-router-dom";
import { Header } from "../../../app/layout/Header";
import { useApprovals } from "../hooks/useApprovals";

export const ApprovalPage = () => {
  const { data, loading, error } = useApprovals();

  if (loading) return <p>読み込み中...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <Header title="申請一覧" back />
      <div className="max-w-xs mx-auto pt-5">
        {data.length === 0 ? (
          <p className="text-gray-500 text-sm">現在、未処理の申請はありません。</p>
        ) : (
          <div className="space-y-3">
            {data.map((req) => (
              <div key={req.request_id} className="card rounded-xl p-4 shadow-sm">
                <Link to={`/requests/${req.request_id}`}>
                  <p className="font-medium">{req.child?.user_name ?? "(不明)"}</p>
                  <p>¥{req.amount.toLocaleString()}</p>
                </Link>
                <p className="text-sm text-gray-600">{req.reason}</p>
                <div className="flex gap-2 mt-3">
                  <button type="button" className="flex-1 btn-green py-1 rounded-lg font-medium">
                    承認
                  </button>
                  <button type="button" className="flex-1 btn-red py-1 rounded-lg font-medium">
                    却下
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};
