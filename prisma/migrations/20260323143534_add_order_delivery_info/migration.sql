-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "customerName" TEXT NOT NULL DEFAULT 'Chua cap nhat',
ADD COLUMN     "deliveryAddress" TEXT NOT NULL DEFAULT 'Chua cap nhat',
ADD COLUMN     "phoneNumber" TEXT NOT NULL DEFAULT 'Chua cap nhat';
