import type { Request } from "../../../../shared/types/request";

type Props = { requests: Request[] };

export const RequestStatusList = ({ requests }: Props) => {
  if (requests.length === 0) return <p className="text-sm text-gray-500">まだ申請がありません。</p>;

  return (
    <div className="space-y-2">
      {requests.slice(0, 3).map((r) => (
        <div key={r.request_id} className="card p-3 flex justify-between items-center text-sm">
          <div>
            <p className="font-medium">{r.reason}</p>
            <p className="text-xs text-gray-500">¥{Number(r.amount).toLocaleString()}</p>
          </div>
          <span
            className={`px-2 py-0.5 rounded-md text-xs ${
              !r.approval
                ? "btn-yellow"
                : r.approval.status === "approved"
                  ? "btn-green"
                  : "btn-red"
            }`}
          >
            {!r.approval ? "承認待ち" : r.approval.status === "approved" ? "承認済" : "却下"}
          </span>
        </div>
      ))}
    </div>
  );
};
