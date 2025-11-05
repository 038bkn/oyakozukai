export interface Request {
  request_id: number;
  amount: number;
  reason: string;
  request_at: string;
  approval: {
    status: "pending" | "approved" | "rejected";
  };
  child: {
    user_name: string;
  };
}
