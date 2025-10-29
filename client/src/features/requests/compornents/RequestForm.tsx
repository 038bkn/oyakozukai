import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { createRequest } from "../api/createRequest";

export const RequestForm = () => {
  const [amount, setAmount] = useState("");
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <reason>
  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  }, [reason]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!amount || !reason.trim()) {
      alert("金額と理由を入力してね");
      return;
    }
    if (Number(amount) <= 0) {
      toast.error("金額は1円以上で入力してね");
      return;
    }

    setLoading(true);

    try {
      const data = {
        child_user_id: 1,
        amount: Number(amount),
        reason,
      };

      await createRequest(data);

      toast.success("リクエストを送信しました！");
      setAmount("");
      setReason("");
    } catch (err) {
      console.error(err);
      toast.error("通信エラーが発生しました");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <label className="flex flex-col gap-1">
        <span className="text-sm font-semibold">金額(円)</span>
        <input
          type="number"
          placeholder="例：500"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="card"
        />
      </label>

      <label className="flex flex-col gap-1">
        <span className="text-sm font-semibold text-[valr(--color-text)">理由</span>
        <textarea
          ref={textareaRef}
          placeholder="例：友達とカフェに行きたい"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          className="resize-none overflow-hidden card"
        />
      </label>
      <button
        type="submit"
        className={`${loading ? "cursor-not-allowed" : "btn-green"} flex justify-center gap-2 items-center rounded-full h-8`}
        disabled={loading}
      >
        <PaperAirplaneIcon className="w-5 h-5" />
        {loading ? "送信中..." : "送信"}
      </button>
    </form>
  );
};
