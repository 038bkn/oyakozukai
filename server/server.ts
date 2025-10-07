import { PrismaClient } from "@prisma/client";
import express from "express";

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

// 動作確認用
app.get("/", (req, res) => {
    res.send("サーバー動いてるよ～！");
});

// お小遣いリクエスト(子ども用)
app.post("/requests", async (req, res) => {
    try {
        const { child_user_id, amount, reason } = req.body;

        const request = await prisma.request.create({
            data: {
                child_user_id,
                amount,
                reason,
            },
        });

        res.json(request);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "リクエストの作成に失敗しちゃった><"});
    }
});

// リクエスト一覧取得(親用)
app.get("/requests", async (req, res) => {
    try {
        const requests = await prisma.request.findMany({
            include: {
                child: {
                    select: { user_name: true }
                },
                approval: true,
            },
        });
        res.json(requests)
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "リクエスト一覧の取得に失敗しちゃった><"});
    }
});

app.post("/approvals/:id", async (req, res) => {
    try {
        const requestId = Number(req.params.id);
        const { approver_user_id, status } = req.body;

        const request = await prisma.request.findUnique({
            where: { request_id: requestId },
        });

        if (!request) {
            return res.status(404).json({ error: "リクエストが見つからないよ～><"})
        }

        const approval = await prisma.approval.create({
            data: {
                request_id: requestId,
                approver_user_id,
                status
            },
        });

        let transaction = null;
        if (status === "approved") {
            transaction = await prisma.transaction.create({
                data: {
                    approval_id: approval.approval_id,
                    sender_user_id: approver_user_id,
                    recipient_user_id: request.child_user_id,
                    amount: request.amount,
                },
            });
        }

        res.json({ approval, transaction });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "リクエストの承認 / 拒否に失敗したよ><"})
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`サーバー立ち上がったよ～☞ http://localhost:${PORT}`)
});