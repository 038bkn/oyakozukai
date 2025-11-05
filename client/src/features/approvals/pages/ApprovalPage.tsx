import { Header } from "../../../app/layout/Header";
import { ApprovalCard } from "../components/ApprovalCard";
import { useApprovals } from "../hooks/useApprovals";

export const ApprovalPage = () => {
  const { data, loading, error, handleApprove, handleReject } = useApprovals();

  if (loading) return <p>読み込み中...</p>;
  if (error) return <p>{error}</p>;

  const pendingRequests = data.filter((req) => req.approval === null);

  return (
    <>
      <Header title="未対応の申請一覧" back />
      <div className="max-w-xs mx-auto pt-5">
        {pendingRequests.length === 0 ? (
          <p className="text-gray-500 text-sm">現在、未対応の申請はありません。</p>
        ) : (
          pendingRequests.map((req) => (
            <ApprovalCard
              key={req.request_id}
              request={req}
              onApprove={handleApprove}
              onReject={handleReject}
            />
          ))
        )}
      </div>
    </>
  );
};
