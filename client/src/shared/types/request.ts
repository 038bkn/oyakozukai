export interface Request {
  request_id: number;
  amount: number;
  reason: string;
  request_at: string;
  approval: {
    status: "pending" | "approved" | null;
  };
  child: {
    user_name: string;
  };
}
