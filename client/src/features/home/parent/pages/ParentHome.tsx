import { useNavigate } from "react-router-dom";
import { Header } from "../../../../app/layout/Header";
import type { Transaction } from "../../../../shared/types/transaction";
import { ApprovalCard } from "../../../approvals/components/ApprovalCard";
import { TransactionCard } from "../../../history/components/TransactionCard";
import { useParentHome } from "../hooks/useParentHome";

export const ParentHome = () => {
  const navigate = useNavigate();
  const { requests, transactions, loading, error, handleApprove, handleReject } = useParentHome();

  if (loading) return <p>読み込み中...</p>;
  if (error) return <p>{error}</p>;

  const pendingRequests = requests.filter((r) => r.approval === null).slice(0, 3);
  const latestTransaction = transactions.slice(0, 3);

  return (
    <>
      <Header title="親ホーム" />
      <div className="p-4 space-y-6">
        {/* 申請確認 */}
        <section className="card p-3">
          <div className="flex justify-between items-center mb-2">
            <h2 className="font-semibold">
              申請確認
              <span className="text-sm text-gray-500 card mx-2 px-1">
                全{requests.filter((r) => r.approval === null).length}件
              </span>
            </h2>
            <button
              type="button"
              onClick={() => navigate("/approvals")}
              className="text-sm text-gray-500 hover:underline"
            >
              一覧 →
            </button>
          </div>

          <div className="space-y-2">
            {pendingRequests.length === 0 ? (
              <p className="text-gray-500 text-sm">現在、未対応の申請はありません。</p>
            ) : (
              pendingRequests.map((req) => (
                <div key={req.request_id} className="scale-90 text-sm">
                  <ApprovalCard request={req} onApprove={handleApprove} onReject={handleReject} />
                </div>
              ))
            )}
          </div>
        </section>

        {/* 送金履歴 */}
        <section className="card p-3">
          <div className="flex justify-between items-center mb-2">
            <h2 className="font-semibold">履歴</h2>
            <button
              type="button"
              onClick={() => navigate("/history")}
              className="text-sm text-gray-500 hover:underline"
            >
              一覧 →
            </button>
          </div>

          <div className="space-y-2">
            {latestTransaction.length === 0 ? (
              <p className="text-gray-500 text-sm">まだ履歴がありません。</p>
            ) : (
              latestTransaction.map((t: Transaction) => (
                <div key={t.transaction_id} className="scale-90">
                  <TransactionCard transaction={t} />
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </>
  );
};
