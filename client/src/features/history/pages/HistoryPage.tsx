import { TransactionCard } from "../components/TransactionCard";
import { useHistory } from "../hooks/useHistory";

export const HistoryPage = () => {
  const { data, loading, error } = useHistory();

  if (loading) return <p>読み込み中・・・</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>送金履歴</h1>
      {data.length === 0 ? (
        <p>履歴がありません</p>
      ) : (
        data.map((t) => <TransactionCard key={t.id} transaction={t} />)
      )}
    </div>
  );
};
