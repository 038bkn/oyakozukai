export interface Transaction {
  id: number;
  user_name: string;
  amount: number;
  reason: string;
  date: string;
  status: "pending" | "approved" | "rejected";
}

export const TransactionCard = ({ transaction }: { transaction: Transaction }) => {
  const bgColor = transaction.status === "rejected" ? "card-error" : "card-white";
  return (
    <div className={`${bgColor}`}>
      <div>
        <p>{transaction.user_name}</p>
        <p>{transaction.date}</p>
      </div>

      <p>{transaction.amount}</p>

      <p>{transaction.reason}</p>
    </div>
  );
};
