export const getTransactions = async () => {
  const res = await fetch("http://localhost:3000/transactions");
  if (!res.ok) throw new Error("履歴の取得に失敗しました");
  return res.json();
};
