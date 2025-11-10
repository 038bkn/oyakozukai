import { useNavigate } from "react-router-dom";
import { Header } from "../../../../app/layout/Header";
import type { Transaction } from "../../../../shared/types";
import { TransactionCard } from "../../../history/components/TransactionCard";
// import { BalanceCard } from "../components/BalanceCard";
import { RequestStatusList } from "../components/RequestStatusList";
import { useChildHome } from "../hooks/useChildHome";

export const ChildHome = () => {
  const navigate = useNavigate();
  const childId = 2;
  const { requests, loading, error, transactions } = useChildHome(childId);

  if (loading) return <p>読み込み中...</p>;
  if (error) return <p>{error}</p>;

  const pendingRequests = requests.filter((r) => r.approval === null).slice(0, 3);
  const latestTransaction = transactions.slice(0, 3);

  return (
    <>
      <Header title="ホーム" />
      <div className="p-4 space-y-6">
        {/* <BalanceCard balance={balance} /> */}

        {/* 対応待ちの申請 */}
        <section className="card p-3">
          <div className="flex justify-between items-center mb-2">
            <h2 className="font-semibold">
              対応待ちの申請
              <span className="text-sm text-gray-500 card mx-2 px-1">
                全{requests.filter((r) => r.approval === null).length}件
              </span>
            </h2>
            {/* <button
              type="button"
              onClick={() => navigate("/request")}
              className="text-sm text-gray-500 hover:underline"
            >
              一覧 →
            </button> */}
          </div>
          {pendingRequests.length === 0 ? (
            <p className="text-gray-500 text-sm">現在対応待ちの申請はありません。</p>
          ) : (
            <RequestStatusList requests={pendingRequests} />
          )}
        </section>

        {/* 履歴 */}
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

        <div className="pt-4">
          <button
            type="button"
            onClick={() => navigate("/request")}
            className="w-full btn-green text-white font-semibold py-3 rounded-lg shadow"
          >
            おこづかいを申請する
          </button>
        </div>
      </div>
    </>
  );
};
