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
  return <p>aaa</p>;
};
