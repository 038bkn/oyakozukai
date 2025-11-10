import { PrismaClient, type Status } from "@prisma/client";
import cors from "cors";
import express from "express";

const app = express();
const prisma = new PrismaClient();

// --- Middleware ----------------------------------------------------
app.use(
  cors({
    origin: [
    "https://oyakozukai.vercel.app",
    "http://localhost:5173"
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
  }),
);
app.use(express.json());

// --- 共通エラーハンドラ ------------------------------------------
const handleError = (
  res: express.Response,
  error: unknown,
  message: string,
  status: number = 500,
) => {
  console.error(`✕ [${message}]`, error);
  res.status(status).json({ error: message });
};

// --- 型 ------------------------------------------------------------
type ApprovalStatus = Status;

// --- 動作確認 ------------------------------------------------------
app.get("/", (_req, res) => {
  res.send("サーバー動いてるよ～🚀");
});

//
// お小遣いリクエスト作成
//
app.post("/requests", async (req, res) => {
  try {
    const { child_user_id, amount, reason } = req.body;

    if (!child_user_id || !amount || !reason)
      return res.status(400).json({ error: "全部入力してね～！" });

    const amountNum = Number(amount);
    if (isNaN(amountNum) || amountNum <= 0)
      return res.status(400).json({ error: "金額は0より大きい数字にしてね～！" });

    const request = await prisma.request.create({
      data: { child_user_id, amount: amountNum, reason },
    });

    res.json({ ...request, amount: Number(request.amount) });
  } catch (error) {
    handleError(res, error, "お小遣いリクエストの作成に失敗したよ～><");
  }
});

//
// 親：全リクエスト取得
//
app.get("/requests", async (_req, res) => {
  try {
    const requests = await prisma.request.findMany({
      include: {
        child: { select: { user_id: true, user_name: true } },
        approval: { select: { status: true } },
      },
      orderBy: { requested_at: "desc" },
    });

    const normalized = requests.map((r) => ({
      ...r,
      amount: Number(r.amount),
    }));

    res.json(normalized);
  } catch (error) {
    handleError(res, error, "お小遣いリクエスト一覧の取得に失敗したよ～><");
  }
});

//
// 子：特定のリクエスト取得
//
app.get("/requests/child/:childId", async (req, res) => {
  try {
    const childId = Number(req.params.childId);
    if (!Number.isFinite(childId)) return res.status(400).json({ error: "childId が不正です" });

    const requests = await prisma.request.findMany({
      where: { child_user_id: childId },
      include: {
        approval: { select: { status: true } },
        transaction: { select: { transacted_at: true, amount: true } },
      },
      orderBy: { requested_at: "desc" },
    });

    const normalized = requests.map((r) => ({
      ...r,
      amount: Number(r.amount),
    }));

    res.json(normalized);
  } catch (error) {
    handleError(res, error, "子どものリクエスト一覧の取得に失敗したよ～><");
  }
});

//
// 対応待ちのリクエスト一覧
//
app.get("/requests/pending", async (_req, res) => {
  try {
    const pendingRequests = await prisma.request.findMany({
      where: {
        approval: null,
      },
      include: {
        child: { select: { user_id: true, user_name: true } },
      },
      orderBy: { requested_at: "desc" },
    });

    const normalized = pendingRequests.map((r) => ({
      ...r,
      amount: Number(r.amount),
    }));

    res.json(normalized);
  } catch (error) {
    handleError(res, error, "未対応のリクエスト一覧の取得に失敗したよ～><");
  }
});

//
// リクエストの承認・却下
//
app.post("/approvals/:id", async (req, res) => {
  try {
    const requestId = Number(req.params.id);
    const { approver_user_id, status }: { approver_user_id: number; status: ApprovalStatus } =
      req.body;

    if (!["approved", "rejected"].includes(status))
      return res.status(400).json({ error: "statusは'approved'か'rejected'だけだよ～><" });

    const request = await prisma.request.findUnique({
      where: { request_id: requestId },
    });
    if (!request) return res.status(404).json({ error: "リクエストが見つからないよ～><" });

    const approval = await prisma.approval.create({
      data: { request_id: requestId, approver_user_id, status },
    });

    const transaction = await prisma.transaction.create({
      data: {
        approval_id: approval.approval_id,
        sender_user_id: approver_user_id,
        recipient_user_id: request.child_user_id,
        amount: status === "approved" ? request.amount : 0,
        request_id: request.request_id,
      },
      include: {
        sender: { select: { user_name: true } },
        recipient: { select: { user_name: true } },
        approval: { select: { status: true } },
      },
    });

    res.json({
      approval,
      transaction: { ...transaction, amount: Number(transaction.amount) },
    });
  } catch (error) {
    handleError(res, error, "リクエストの承認 / 拒否に失敗したよ～><");
  }
});

//
// 全体の送金履歴
//
app.get("/transactions", async (_req, res) => {
  try {
    const transactions = await prisma.transaction.findMany({
      include: {
        sender: { select: { user_id: true, user_name: true } },
        recipient: { select: { user_id: true, user_name: true } },
        approval: { select: { status: true } },
        request: { select: { reason: true } },
      },
      orderBy: { transacted_at: "desc" },
    });

    const normalized = transactions.map((t) => ({
      ...t,
      amount: Number(t.amount),
    }));

    res.json(normalized);
  } catch (error) {
    handleError(res, error, "全体の履歴取得に失敗したよ～><");
  }
});

//
// 特定ユーザーの送金履歴
//
app.get("/transactions/user/:id", async (req, res) => {
  try {
    const userId = Number(req.params.id);
    if (!Number.isFinite(userId)) return res.status(400).json({ error: "userId が不正です" });

    const transactions = await prisma.transaction.findMany({
      where: {
        OR: [{ sender_user_id: userId }, { recipient_user_id: userId }],
      },
      include: {
        sender: { select: { user_name: true } },
        recipient: { select: { user_name: true } },
        approval: { select: { status: true } },
      },
      orderBy: { transacted_at: "desc" },
    });

    const normalized = transactions.map((t) => ({
      ...t,
      amount: Number(t.amount),
    }));

    res.json(normalized);
  } catch (error) {
    handleError(res, error, "ユーザー別の履歴取得に失敗したよ～><");
  }
});

//
// 子ども専用：受け取り履歴のみ
//
app.get("/transactions/child/:childId", async (req, res) => {
  try {
    const childId = Number(req.params.childId);
    if (!Number.isFinite(childId)) return res.status(400).json({ error: "childId が不正です" });

    const transactions = await prisma.transaction.findMany({
      where: { recipient_user_id: childId },
      include: {
        sender: { select: { user_name: true } },
        approval: { select: { status: true } },
      },
      orderBy: { transacted_at: "desc" },
    });

    const normalized = transactions.map((t) => ({
      ...t,
      amount: Number(t.amount),
    }));

    res.json(normalized);
  } catch (error) {
    handleError(res, error, "子どもの送金履歴取得に失敗したよ～><");
  }
});

// --- サーバー起動 -------------------------------------------------
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`サーバー立ち上がったよ～☞ Port:${PORT}`);
});

process.on("SIGINT", async () => {
  await prisma.$disconnect();
  console.log("Prisma切断して終了するね～Bye👋");
  process.exit(0);
});
