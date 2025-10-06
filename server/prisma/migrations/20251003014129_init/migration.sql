-- CreateEnum
CREATE TYPE "public"."Role" AS ENUM ('parent', 'child');

-- CreateEnum
CREATE TYPE "public"."Status" AS ENUM ('pending', 'approved', 'rejected');

-- CreateEnum
CREATE TYPE "public"."Interval" AS ENUM ('weekly', 'biweekly', 'monthly');

-- CreateTable
CREATE TABLE "public"."User" (
    "user_id" SERIAL NOT NULL,
    "user_name" TEXT NOT NULL,
    "role" "public"."Role" NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "public"."Request" (
    "request_id" SERIAL NOT NULL,
    "child_user_id" INTEGER NOT NULL,
    "amount" DECIMAL(10,2) NOT NULL,
    "reason" TEXT NOT NULL,
    "requested_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Request_pkey" PRIMARY KEY ("request_id")
);

-- CreateTable
CREATE TABLE "public"."Approval" (
    "approval_id" SERIAL NOT NULL,
    "request_id" INTEGER NOT NULL,
    "approver_user_id" INTEGER NOT NULL,
    "status" "public"."Status" NOT NULL DEFAULT 'pending',
    "decided_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Approval_pkey" PRIMARY KEY ("approval_id")
);

-- CreateTable
CREATE TABLE "public"."StandingOrder" (
    "standing_order_id" SERIAL NOT NULL,
    "child_user_id" INTEGER NOT NULL,
    "amount" DECIMAL(10,2) NOT NULL,
    "name" TEXT NOT NULL,
    "interval" "public"."Interval" NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "is_active" BOOLEAN NOT NULL,

    CONSTRAINT "StandingOrder_pkey" PRIMARY KEY ("standing_order_id")
);

-- CreateTable
CREATE TABLE "public"."Transaction" (
    "transaction_id" SERIAL NOT NULL,
    "amount" DECIMAL(10,2) NOT NULL,
    "transacted_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "sender_user_id" INTEGER NOT NULL,
    "recipient_user_id" INTEGER NOT NULL,
    "approval_id" INTEGER,
    "standing_order_id" INTEGER,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("transaction_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Approval_request_id_key" ON "public"."Approval"("request_id");

-- CreateIndex
CREATE UNIQUE INDEX "Transaction_approval_id_key" ON "public"."Transaction"("approval_id");

-- AddForeignKey
ALTER TABLE "public"."Request" ADD CONSTRAINT "Request_child_user_id_fkey" FOREIGN KEY ("child_user_id") REFERENCES "public"."User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Approval" ADD CONSTRAINT "Approval_request_id_fkey" FOREIGN KEY ("request_id") REFERENCES "public"."Request"("request_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Approval" ADD CONSTRAINT "Approval_approver_user_id_fkey" FOREIGN KEY ("approver_user_id") REFERENCES "public"."User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."StandingOrder" ADD CONSTRAINT "StandingOrder_child_user_id_fkey" FOREIGN KEY ("child_user_id") REFERENCES "public"."User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Transaction" ADD CONSTRAINT "Transaction_sender_user_id_fkey" FOREIGN KEY ("sender_user_id") REFERENCES "public"."User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Transaction" ADD CONSTRAINT "Transaction_recipient_user_id_fkey" FOREIGN KEY ("recipient_user_id") REFERENCES "public"."User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Transaction" ADD CONSTRAINT "Transaction_approval_id_fkey" FOREIGN KEY ("approval_id") REFERENCES "public"."Approval"("approval_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Transaction" ADD CONSTRAINT "Transaction_standing_order_id_fkey" FOREIGN KEY ("standing_order_id") REFERENCES "public"."StandingOrder"("standing_order_id") ON DELETE SET NULL ON UPDATE CASCADE;
