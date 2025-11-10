export async function apiFetch<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`APIエラー: ${res.status} ${res.statusText}\n${errText}`);
  }

  return res.json() as Promise<T>;
}
