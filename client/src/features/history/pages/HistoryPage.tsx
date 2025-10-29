import { useState } from "react";
import { Header } from "../../../app/layout/Header";
import type { Filters } from "../components/HistoryFilter";
import { HistoryFilter } from "../components/HistoryFilter";
import { TransactionCard } from "../components/TransactionCard";
import { useHistory } from "../hooks/useHistory";

export const HistoryPage = () => {
  const { data, loading, error } = useHistory();
  const [filters, setFilters] = useState<Filters>({ type: "all", status: "all" });

  if (loading) return <p>読み込み中・・・</p>;
  if (error) return <p>{error}</p>;

  const filtered = data.filter((t) => {
    const matchStatus = filters.status === "all" ? true : t.txnStatus === filters.status;
    const matchType = true;
    return matchStatus && matchType;
  });

  return (
    <>
      <Header title="送金履歴" back />
      <div className="max-w-xs mx-auto pt-5">
        <HistoryFilter filters={filters} onFilterChange={setFilters} />
        <div className="card-bg text-gray-500 text-sm">
          {filtered.length === 0 ? (
            <p>履歴がありません</p>
          ) : (
            filtered.map((t) => <TransactionCard key={t.id} transaction={t} />)
          )}
        </div>
      </div>
    </>
  );
};
