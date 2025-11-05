import { format } from "date-fns";

export interface Transaction {
  id: number;
  user_name: string;
  amount: number;
  reason?: string;
  date: string;
  txnStatus: "pending" | "approved" | "rejected";
}

export const TransactionCard = ({ transaction }: { transaction: Transaction }) => {
  const { user_name, amount, reason, date, txnStatus } = transaction;

  const statusBadge =
    txnStatus === "pending" ? "btn-yellow" : txnStatus === "approved" ? "btn-green" : "btn-red";

  const formatDate = (date: string | Date) => {
    return format(new Date(date), "yyyy-MM-dd");
  };

  return (
    <div className={"card rounded-xl shadow-sm p-4 mb-3 border border-gray-200"}>
      <div className="flex justify-between mb-2">
        <div className="flex items-center gap-2">
          <p className="font-semibold">{user_name}</p>
          <span className="text-xs px-2 py-0.5 rounded-md font-medium btn-black">申請</span>
          <span className={`text-xs px-2 py-0.5 rounded-md font-medium ${statusBadge}`}>
            {txnStatus === "pending" ? "承認待ち" : txnStatus === "approved" ? "送金済み" : "却下"}
          </span>
        </div>

        <p className="text-sm text-gray-500">{formatDate(date)}</p>
      </div>

      <p className="font-bold text-lg text-gray-900">{amount}</p>

      <p className="text-sm text-gray-600 mt-1">{reason}</p>
    </div>
  );
};
