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
{
  /* <div className="card rounded-xl shadow-sm p-4 mb-3 border border-gray-200">
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
</div>; */
}
