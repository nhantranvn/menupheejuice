-- CreateTable
CREATE TABLE "MenuItemInCategory" (
    "menuItemId" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "MenuItemInCategory_pkey" PRIMARY KEY ("menuItemId","categoryId")
);

-- 1. Create a mapping for duplicates
-- We pick the first ID (alphabetically/chronologically) as the 'primary' ID for each product name
CREATE TEMP TABLE "ItemMapping" AS
WITH GroupedItems AS (
    SELECT id, name, 
           FIRST_VALUE(id) OVER (PARTITION BY name ORDER BY id ASC) as primary_id
    FROM "MenuItem"
)
SELECT id as old_id, primary_id as new_id FROM GroupedItems WHERE id != primary_id;

-- 2. Update OrderItems to point to primary items to preserve history
UPDATE "OrderItem"
SET "menuItemId" = m.new_id
FROM "ItemMapping" m
WHERE "menuItemId" = m.old_id;

-- 3. Update Variants to point to primary items
-- First, delete variants from duplicates if the primary item already has a variant of that same size
DELETE FROM "MenuItemVariant" v
USING "ItemMapping" m
WHERE v."menuItemId" = m.old_id
  AND EXISTS (
    SELECT 1 FROM "MenuItemVariant" v2 
    WHERE v2."menuItemId" = m.new_id AND v2."sizeMl" = v."sizeMl"
  );

-- Move the remaining unique variants to the primary item
UPDATE "MenuItemVariant"
SET "menuItemId" = m.new_id
FROM "ItemMapping" m
WHERE "menuItemId" = m.old_id;

-- 4. Migrate connections to the new junction table (using distinct to avoid pkey conflicts)
INSERT INTO "MenuItemInCategory" ("menuItemId", "categoryId", "sortOrder")
SELECT DISTINCT 
    COALESCE(m.new_id, mi.id), 
    mi."categoryId", 
    mi."sortOrder"
FROM "MenuItem" mi
LEFT JOIN "ItemMapping" m ON mi.id = m.old_id
ON CONFLICT DO NOTHING;

-- 5. Delete the non-primary duplicate items from the system
DELETE FROM "MenuItem" WHERE id IN (SELECT old_id FROM "ItemMapping");

-- 6. Cleanup the old table structure
ALTER TABLE "MenuItem" DROP CONSTRAINT IF EXISTS "MenuItem_categoryId_fkey";
DROP INDEX IF EXISTS "MenuItem_categoryId_name_key";
ALTER TABLE "MenuItem" DROP COLUMN IF EXISTS "categoryId", DROP COLUMN IF EXISTS "sortOrder";

-- 7. Create Unique Index (this will succeed now as data is clean)
CREATE UNIQUE INDEX "MenuItem_name_key" ON "MenuItem"("name");

-- 8. Add Foreign Keys for the new architecture
ALTER TABLE "MenuItemInCategory" ADD CONSTRAINT "MenuItemInCategory_menuItemId_fkey" FOREIGN KEY ("menuItemId") REFERENCES "MenuItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "MenuItemInCategory" ADD CONSTRAINT "MenuItemInCategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "MenuCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;
