import { format } from "date-fns";

export interface Transaction {
  id: number;
  user_name: string;
  amount: number;
  reason: string;
  date: string;
  txnStatus: "pending" | "approved" | "rejected";
}

export const TransactionCard = ({ transaction }: { transaction: Transaction }) => {
  const { user_name, amount, reason, date, txnStatus } = transaction;

  const statusBadge =
    txnStatus === "pending"
      ? "bg-yellow-100 text-yellow-800"
      : txnStatus === "approved"
        ? "bg-green-100 text-green-800"
        : "bg-red-100 text-red-800";

  const formatDate = (date: string | Date) => {
    return format(new Date(date), "yyyy-MM-dd");
  };

  return (
    <div className={"card rounded-xl shadow-sm p-4 mb-3 border border-gray-200"}>
      <div className="flex justify-between mb-2">
        <div className="flex items-center gap-2">
          <p className="font-semibold">{user_name}</p>
          <span className="text-xs px-2 py-0.5 rounded-full bg-gray-200 text-gray-700">申請</span>
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusBadge}`}>
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
