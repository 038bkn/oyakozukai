export const approveRequest = async (requestId: number, approverId = 1) => {
  const res = await fetch(`http://localhost:3000/approvals/${requestId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      approver_user_id: approverId,
      status: "approved",
    }),
  });

  if (!res.ok) throw new Error("承認リクエストに失敗しました");
  return res.json();
};
