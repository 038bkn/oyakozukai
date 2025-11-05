import toast from "react-hot-toast";
import type { Request } from "../../../shared/types/request";

type ApprovalCardProps = {
  request: Request;
  onApprove: (id: number) => Promise<void>;
  onReject: (id: number) => Promise<void>;
};

export const ApprovalCard = ({ request, onApprove, onReject }: ApprovalCardProps) => {
  return (
    <div className="card rounded-xl p-4 shadow-sm">
      <p className="font-medium">{request.child?.user_name ?? "(不明)"}</p>
      <p>¥{Number(request.amount).toLocaleString()}</p>
      <p className="text-sm text-gray-600">{request.reason}</p>

      <div className="flex gap-2 mt-3">
        <button
          type="button"
          onClick={async () => {
            await onApprove(request.request_id);
            toast.success("承認しました！");
          }}
          className="flex-1 btn-green py-1 rounded-lg font-medium"
        >
          承認
        </button>

        <button
          type="button"
          onClick={async () => {
            await onReject(request.request_id);
            toast.success("却下しました！");
          }}
          className="flex-1 btn-red py-1 rounded-lg font-medium"
        >
          却下
        </button>
      </div>
    </div>
  );
};
