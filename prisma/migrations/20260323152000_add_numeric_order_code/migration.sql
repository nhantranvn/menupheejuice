-- CreateSequence
CREATE SEQUENCE "Order_orderCode_seq";

-- AlterTable
ALTER TABLE "Order" ADD COLUMN "orderCode" INTEGER;

-- Backfill existing rows
UPDATE "Order"
SET "orderCode" = nextval('"Order_orderCode_seq"')
WHERE "orderCode" IS NULL;

-- Ensure future inserts continue from the current max value
SELECT setval(
  '"Order_orderCode_seq"',
  GREATEST(COALESCE((SELECT MAX("orderCode") FROM "Order"), 0) + 1, 1),
  false
);

ALTER TABLE "Order" ALTER COLUMN "orderCode" SET DEFAULT nextval('"Order_orderCode_seq"');
ALTER TABLE "Order" ALTER COLUMN "orderCode" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Order_orderCode_key" ON "Order"("orderCode");