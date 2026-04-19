-- CreateTable
CREATE TABLE "MenuItemInCategory" (
    "menuItemId" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "MenuItemInCategory_pkey" PRIMARY KEY ("menuItemId","categoryId")
);

-- Migrate existing data
INSERT INTO "MenuItemInCategory" ("menuItemId", "categoryId", "sortOrder")
SELECT "id", "categoryId", "sortOrder" FROM "MenuItem";

-- DropForeignKey
ALTER TABLE "MenuItem" DROP CONSTRAINT "MenuItem_categoryId_fkey";

-- DropIndex
DROP INDEX "MenuItem_categoryId_name_key";

-- AlterTable
ALTER TABLE "MenuItem" DROP COLUMN "categoryId",
DROP COLUMN "sortOrder";

-- CreateIndex
CREATE UNIQUE INDEX "MenuItem_name_key" ON "MenuItem"("name");

-- AddForeignKey
ALTER TABLE "MenuItemInCategory" ADD CONSTRAINT "MenuItemInCategory_menuItemId_fkey" FOREIGN KEY ("menuItemId") REFERENCES "MenuItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MenuItemInCategory" ADD CONSTRAINT "MenuItemInCategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "MenuCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;
