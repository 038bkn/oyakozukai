import { useEffect, useState } from "react";
import { Header } from "../../../app/layout/Header";
import { ApprovalCard } from "../../approvals/components/ApprovalCard";
import { useApprovals } from "../../approvals/hooks/useApprovals";
import { getTransactions } from "../../history/api/getTransactions";
import { type Transaction, TransactionCard } from "../../history/components/TransactionCard";

export const ParentHome = () => {
  const { data: requests, loading, error, handleApprove, handleReject } = useApprovals();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [txLoading, setTxLoading] = useState(true);
  const [txError, setTxError] = useState<string | null>(null);

  // useEffect(() => {
  //   setTransactions([
  //     { id: 1, user_name: "コジコジ", amount: 1000, date: "2025-07-05", txnStatus: "pending" },
  //     { id: 2, user_name: "ジョニー", amount: 800, date: "2025-07-02", txnStatus: "rejected" },
  //     { id: 3, user_name: "コジコジ", amount: 1000, date: "2025-07-05", txnStatus: "approved" },
  //   ]);
  // }, []);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const data = await getTransactions();
        setTransactions(data);
      } catch (err) {
        console.error(err);
        setTxError("送金履歴の取得に失敗しました");
      } finally {
        setTxLoading(false);
      }
    };

    fetchTransactions();
  });

  if (loading || txLoading) return <p>読み込み中...</p>;
  if (error || txError) return <p>{error ?? txError}</p>;

  const pendingRequests = requests.filter((r) => r.approval === null).slice(0, 3);
  const latestTransaction = transactions.slice(0, 3);

  return (
    <>
      <Header title="ホーム" />
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
            <button type="button" className="text-sm text-gray-500">
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
            <h2 className="font-semibold">送金履歴</h2>
            <button type="button" className="text-sm text-gray-500">
              一覧 →
            </button>
          </div>
          <div className="space-y-2">
            {latestTransaction.length === 0 ? (
              <p className="text-gray-500 text-sm">まだ履歴がありません</p>
            ) : (
              latestTransaction.map((t: Transaction) => (
                <div key={t.id} className="scale-90">
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
