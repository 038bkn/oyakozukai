export const getRequestsForParent = async () => {
  const res = await fetch("http://localhost:3000/requests");
  if (!res.ok) throw new Error("申請データの取得に失敗しました");
  return res.json();
};
