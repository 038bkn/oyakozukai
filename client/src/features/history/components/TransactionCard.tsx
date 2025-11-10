import { format } from "date-fns";
import type { Transaction } from "../../../shared/types/transaction";

export const TransactionCard = ({ transaction }: { transaction: Transaction }) => {
  const { sender, amount, transacted_at, approval, request } = transaction;

  const txnStatus = approval?.status ?? "pending";

  const statusBadge =
    txnStatus === "pending" ? "btn-yellow" : txnStatus === "approved" ? "btn-green" : "btn-red";

  const formatDate = (date: string | Date) => format(new Date(date), "yyyy-MM-dd");

  return (
    <div className="card rounded-xl shadow-sm p-4 mb-3 border border-gray-200">
      <div className="flex justify-between mb-2">
        <div className="flex items-center gap-2">
          <p className="font-semibold">{sender?.user_name ?? "不明"}</p>
          <span className="text-xs px-2 py-0.5 rounded-md font-medium btn-black">送金</span>
          <span className={`text-xs px-2 py-0.5 rounded-md font-medium ${statusBadge}`}>
            {txnStatus === "pending" ? "承認待ち" : txnStatus === "approved" ? "送金済み" : "却下"}
          </span>
        </div>
        <p className="text-sm text-gray-500">{formatDate(transacted_at)}</p>
      </div>

      <p className="font-bold text-lg text-gray-900">¥{Number(amount).toLocaleString()}</p>

      {request?.reason && <p className="text-sm text-gray-600 mt-1">{request.reason}</p>}
    </div>
  );
};
