import { FunnelIcon } from "@heroicons/react/24/solid";

export type FilterType = "all" | "regular" | "request";
export type StatusType = "all" | "approved" | "pending" | "rejected";

export type Filters = { type: FilterType; status: StatusType };

type Props = {
  filters: Filters;
  onFilterChange: (filters: Filters) => void;
};

export const HistoryFilter = ({ filters, onFilterChange }: Props) => {
  const handleTypeChange = (newType: Filters["type"]) => {
    onFilterChange({ type: newType, status: filters.status });
  };

  const handleStatusChange = (newStatus: Filters["status"]) => {
    onFilterChange({ type: filters.type, status: newStatus });
  };

  const baseBtn = "px-3 py-1 text-xs rounded-md font-medium";
  const activeBtn = "btn-black";
  const inactiveBtn = "card";

  return (
    <div className="card-bg">
      <div className="flex items-center gap-2 mb-3">
        <FunnelIcon className="w-5 h-5" />
        <p className="font-semibold">フィルター</p>
      </div>

      <p className="text-sm font-semibold mb-1">タイプ</p>
      <div className="flex gap-2 flex-wrap">
        {[
          { key: "all", label: "すべて" },
          { key: "regular", label: "定期" },
          { key: "request", label: "申請" },
        ].map(({ key, label }) => (
          <button
            type="button"
            key={key}
            onClick={() => handleTypeChange(key as Filters["type"])}
            className={`${baseBtn} ${filters.type === key ? activeBtn : inactiveBtn}`}
          >
            {label}
          </button>
        ))}
      </div>

      <p className="text-sm font-semibold mb-1">ステータス</p>
      <div className="flex gap-2 flex-wrap">
        {[
          { key: "all", label: "すべて" },
          { key: "approved", label: "送金済み" },
          { key: "pending", label: "未処理" },
          { key: "rejected", label: "却下" },
        ].map(({ key, label }) => (
          <button
            type="button"
            key={key}
            onClick={() => handleStatusChange(key as Filters["status"])}
            className={`${baseBtn} ${filters.status === key ? activeBtn : inactiveBtn}`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
};
