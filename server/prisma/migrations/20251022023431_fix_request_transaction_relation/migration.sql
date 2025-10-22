/*
  Warnings:

  - A unique constraint covering the columns `[request_id]` on the table `Transaction` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "public"."Transaction" ADD COLUMN     "request_id" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Transaction_request_id_key" ON "public"."Transaction"("request_id");

-- AddForeignKey
ALTER TABLE "public"."Transaction" ADD CONSTRAINT "Transaction_request_id_fkey" FOREIGN KEY ("request_id") REFERENCES "public"."Request"("request_id") ON DELETE SET NULL ON UPDATE CASCADE;
