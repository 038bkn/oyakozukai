import { useEffect, useRef, useState } from "react"

export const RequestForm = () => {

    const [amount, setAmount] = useState("");
    const [reason, setReason] = useState("");
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        textarea.style.height = "auto";
        textarea.style.height = textarea.scrollHeight + "px";
    }, [reason]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("申請内容：", { amount, reason });
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <label className="flex flex-col gap-1">
                <span className="text-sm font-semibold text-[valr(--color-text)">金額(円)</span>
                <input
                    type="number"
                    placeholder="例：500"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />
            </label>

            <label className="flex flex-col gap-1">
                <span className="text-sm font-semibold text-[valr(--color-text)">理由</span>
                <textarea
                    ref={textareaRef}
                    placeholder="例：友達とカフェに行きたい"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    className="resize-none overflow-hidden"
                />
            </label>
            <button type="submit" className="btn-green">
                申請を送信
            </button>
        </form>
    )
}