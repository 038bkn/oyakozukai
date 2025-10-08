import { PrismaClient, type Status } from "@prisma/client";
import express from "express";

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

const handleError = (
  res: express.Response,
  error: unknown,
  message: string,
  status: number = 500,
) => {
  console.error(`✕ [${message}]`, error);
  res.status(status).json({ error: message });
};

type ApprovalStatus = Status;

// 動作確認用
app.get("/", (req, res) => {
  res.send("サーバー動いてるよ～！");
});

// お小遣いリクエストの作成
app.post("/requests", async (req, res) => {
  try {
    const { child_user_id, amount, reason } = req.body;

    if (!child_user_id || !amount || !reason) {
      return res.status(400).json({ error: "全部入力してね～ !" });
    }
    const amountNum = Number(amount);
    if (isNaN(amountNum) || amountNum <= 0) {
      return res.status(400).json({ error: "金額は数字で0より大きくしてね～ !" });
    }

    const request = await prisma.request.create({
      data: {
        child_user_id,
        amount,
        reason,
      },
    });

    res.json(request);
  } catch (error) {
    handleError(res, error, "お小遣いリクエストの作成に失敗したよ～><");
  }
});

// お小遣いリクエスト一覧の取得
app.get("/requests", async (req, res) => {
  try {
    const requests = await prisma.request.findMany({
      include: {
        child: {
          select: { user_name: true },
        },
        approval: true,
      },
    });
    res.json(requests);
  } catch (error) {
    handleError(res, error, "お小遣いリクエスト一覧の取得に失敗したよ～><");
  }
});

// リクエストの承認 / 拒否
app.post("/approvals/:id", async (req, res) => {
  try {
    const requestId = Number(req.params.id);
    const { approver_user_id, status } = req.body;

    if (status !== "approved" && status !== "rejected") {
      return res.status(400).json({
        error: "statusは'approved'か'rejected'だけだよ～><",
      });
    }

    const request = await prisma.request.findUnique({
      where: { request_id: requestId },
    });

    if (!request) {
      return res.status(404).json({ error: "リクエストが見つからないよ～><" });
    }

    const approval = await prisma.approval.create({
      data: {
        request_id: requestId,
        approver_user_id,
        status,
      },
    });

    const transaction = await prisma.transaction.create({
      data: {
        approval_id: approval.approval_id,
        sender_user_id: approver_user_id,
        recipient_user_id: request.child_user_id,
        amount: status === "approved" ? request.amount : 0,
      },
    });

    res.json({ approval, transaction });
  } catch (error) {
    handleError(res, error, "リクエストの承認 / 拒否に失敗したよ～><");
  }
});

// 全体の履歴取得
app.get("/transactions", async (req, res) => {
  try {
    const transactions = await prisma.transaction.findMany({
      orderBy: { transacted_at: "desc" },
      include: {
        sender: { select: { user_name: true, role: true } },
        recipient: { select: { user_name: true, role: true } },
        approval: { select: { status: true } },
      },
    });
    res.json(transactions);
  } catch (error) {
    handleError(res, error, "全体の履歴取得に失敗したよ～><");
  }
});

// 特定ユーザーの履歴取得
app.get("/transactions/user/:id", async (req, res) => {
  try {
    const useId = Number(req.params.id);

    const transactions = await prisma.transaction.findMany({
      where: {
        OR: [{ sender_user_id: useId }, { recipient_user_id: useId }],
      },
      orderBy: { transacted_at: "desc" },
      include: {
        sender: { select: { user_name: true, role: true } },
        recipient: { select: { user_name: true, role: true } },
        approval: { select: { status: true } },
      },
    });

    res.json(transactions);
  } catch (error) {
    handleError(res, error, "ユーザー別の履歴取得に失敗したよ～><");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`サーバー立ち上がったよ～☞ http://localhost:${PORT}`);
});

process.on("SIGINT", async () => {
  await prisma.$disconnect();
  console.log("Prisma切断して終了するね～Bye👋");
  process.exit(0);
});
