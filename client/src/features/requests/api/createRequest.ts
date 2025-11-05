export const createRequest = async (data: {
  child_user_id: number;
  amount: number;
  reason: string;
}) => {
  const res = await fetch("http://localhost:3000/requests", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("");
  }

  return res.json();
};
