"use server";

import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { STARTER_MENU, STARTER_TOPPINGS } from "@/lib/constants/starter-menu";
import { prisma } from "@/lib/prisma";
import { buildMenuItemImageStoragePaths } from "@/lib/uploads";
import {
  createManualMenuItemSchema,
  deleteMenuItemSchema,
  toggleMenuItemAvailabilitySchema,
  updateMenuItemImageSchema,
} from "@/lib/validations/menu-item";

const ALLOWED_IMAGE_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);
const PLACEHOLDER_IMAGE_PREFIX = "https://placehold.co/";

function revalidateMenuPaths() {
  revalidatePath("/");
  revalidatePath("/menu");
  revalidatePath("/admin/menu-items");
}

function isPlaceholderImageUrl(imageUrl: string | null | undefined) {
  return Boolean(imageUrl && imageUrl.startsWith(PLACEHOLDER_IMAGE_PREFIX));
}

function resolveSyncedImageUrl(currentImageUrl: string | null | undefined, starterImageUrl: string | null | undefined) {
  if (!currentImageUrl) {
    return starterImageUrl ?? null;
  }

  if (isPlaceholderImageUrl(currentImageUrl) && starterImageUrl && !isPlaceholderImageUrl(starterImageUrl)) {
    return starterImageUrl;
  }

  return currentImageUrl;
}

export async function initializeStarterMenuAction() {
  const session = await auth();

  if (session?.user?.role !== "ADMIN") {
    return { ok: false, error: "Bạn không có quyền đồng bộ menu gốc." };
  }

  const result = await prisma
    .$transaction(async (tx) => {
      let syncedCategories = 0;
      let syncedItems = 0;
      let createdItems = 0;
      let syncedVariants = 0;
      let syncedToppings = 0;

      for (const topping of STARTER_TOPPINGS) {
        await tx.topping.upsert({
          where: { name: topping.name },
          update: {
            price: topping.price,
            sortOrder: topping.sortOrder,
            isActive: topping.isActive,
          },
          create: {
            name: topping.name,
            price: topping.price,
            sortOrder: topping.sortOrder,
            isActive: topping.isActive,
          },
        });

        syncedToppings += 1;
      }

      for (const categorySeed of STARTER_MENU) {
        const category = await tx.menuCategory.upsert({
          where: { name: categorySeed.name },
          update: {
            sortOrder: categorySeed.sortOrder,
          },
          create: {
            name: categorySeed.name,
            sortOrder: categorySeed.sortOrder,
          },
          select: { id: true },
        });

        syncedCategories += 1;

        for (const itemSeed of categorySeed.items) {
          const existingItem = await tx.menuItem.findUnique({
            where: {
              categoryId_name: {
                categoryId: category.id,
                name: itemSeed.name,
              },
            },
            select: {
              id: true,
              imageUrl: true,
              isAvailable: true,
            },
          });

          const item = existingItem
            ? await tx.menuItem.update({
                where: { id: existingItem.id },
                data: {
                  description: itemSeed.description ?? null,
                  imageUrl: resolveSyncedImageUrl(existingItem.imageUrl, itemSeed.imageUrl),
                  isAvailable: existingItem.isAvailable,
                  sortOrder: itemSeed.sortOrder,
                },
                select: { id: true },
              })
            : await tx.menuItem.create({
                data: {
                  categoryId: category.id,
                  name: itemSeed.name,
                  description: itemSeed.description ?? null,
                  imageUrl: itemSeed.imageUrl ?? null,
                  isAvailable: itemSeed.isAvailable,
                  sortOrder: itemSeed.sortOrder,
                },
                select: { id: true },
              });

          if (!existingItem) {
            createdItems += 1;
          }

          syncedItems += 1;

          for (const variantSeed of itemSeed.variants) {
            await tx.menuItemVariant.upsert({
              where: {
                menuItemId_sizeMl: {
                  menuItemId: item.id,
                  sizeMl: variantSeed.sizeMl,
                },
              },
              update: {
                name: variantSeed.name,
                price: variantSeed.price,
                sortOrder: variantSeed.sortOrder,
              },
              create: {
                menuItemId: item.id,
                name: variantSeed.name,
                sizeMl: variantSeed.sizeMl,
                price: variantSeed.price,
                sortOrder: variantSeed.sortOrder,
              },
            });

            syncedVariants += 1;
          }
        }
      }

      return {
        syncedCategories,
        syncedItems,
        createdItems,
        syncedVariants,
        syncedToppings,
      };
    })
    .catch((error) => {
      return {
        error: error instanceof Error ? error.message : "Không thể đồng bộ menu gốc lúc này.",
      };
    });

  if ("error" in result) {
    return { ok: false, error: result.error };
  }

  revalidateMenuPaths();

  return {
    ok: true,
    message:
      result.createdItems > 0
        ? `Đã đồng bộ ${result.syncedCategories} danh mục, ${result.syncedItems} món, ${result.syncedVariants} size và ${result.syncedToppings} topping. Có ${result.createdItems} món mới vừa được bổ sung lên production.`
        : `Đã đồng bộ ${result.syncedCategories} danh mục, ${result.syncedItems} món, ${result.syncedVariants} size và ${result.syncedToppings} topping.`,
  };
}

export async function updateMenuItemImageAction(formData: FormData) {
  const session = await auth();

  if (session?.user?.role !== "ADMIN") {
    return { ok: false, error: "Bạn không có quyền cập nhật ảnh món." };
  }

  const parsed = updateMenuItemImageSchema.safeParse({
    menuItemId: formData.get("menuItemId"),
  });

  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Dữ liệu món không hợp lệ." };
  }

  const imageFile = formData.get("image");

  if (!(imageFile instanceof File) || imageFile.size === 0) {
    return { ok: false, error: "Vui lòng chọn một file ảnh hợp lệ." };
  }

  if (!ALLOWED_IMAGE_TYPES.has(imageFile.type)) {
    return { ok: false, error: "Chỉ hỗ trợ ảnh JPG, PNG hoặc WEBP." };
  }

  if (imageFile.size > 5 * 1024 * 1024) {
    return { ok: false, error: "Ảnh món cần nhỏ hơn 5MB." };
  }

  const menuItem = await prisma.menuItem.findUnique({
    where: { id: parsed.data.menuItemId },
    select: { id: true, name: true },
  });

  if (!menuItem) {
    return { ok: false, error: "Không tìm thấy món cần cập nhật ảnh." };
  }

  const buffer = Buffer.from(await imageFile.arrayBuffer());
  const storage = buildMenuItemImageStoragePaths(imageFile.name);
  const absolutePath = path.join(process.cwd(), storage.relativeDiskPath);

  await mkdir(path.dirname(absolutePath), { recursive: true });
  await writeFile(absolutePath, buffer);

  await prisma.menuItem.update({
    where: { id: menuItem.id },
    data: { imageUrl: storage.publicUrl },
  });

  revalidateMenuPaths();

  return {
    ok: true,
    message: `Đã cập nhật ảnh cho món ${menuItem.name}. Hãy tải lại trang nếu bạn vẫn thấy ảnh cũ trong bộ nhớ đệm trình duyệt.`,
  };
}

export async function toggleMenuItemAvailabilityAction(input: { menuItemId: string; isAvailable: boolean }) {
  const session = await auth();

  if (session?.user?.role !== "ADMIN") {
    return { ok: false, error: "Bạn không có quyền cập nhật trạng thái món." };
  }

  const parsed = toggleMenuItemAvailabilitySchema.safeParse(input);

  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Dữ liệu trạng thái món không hợp lệ." };
  }

  const menuItem = await prisma.menuItem
    .update({
      where: { id: parsed.data.menuItemId },
      data: { isAvailable: parsed.data.isAvailable },
      select: { name: true, isAvailable: true },
    })
    .catch(() => null);

  if (!menuItem) {
    return { ok: false, error: "Không tìm thấy món cần cập nhật trạng thái." };
  }

  revalidateMenuPaths();

  return {
    ok: true,
    message: menuItem.isAvailable
      ? `Đã chuyển món ${menuItem.name} sang trạng thái đang phục vụ.`
      : `Đã đánh dấu món ${menuItem.name} là hết hàng. Khách vẫn nhìn thấy món nhưng không thể thêm vào giỏ.`,
  };
}

export async function deleteMenuItemAction(input: { menuItemId: string }) {
  const session = await auth();

  if (session?.user?.role !== "ADMIN") {
    return { ok: false, error: "Bạn không có quyền xóa món." };
  }

  const parsed = deleteMenuItemSchema.safeParse(input);

  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Dữ liệu món không hợp lệ." };
  }

  const menuItem = await prisma.menuItem.findUnique({
    where: { id: parsed.data.menuItemId },
    select: { id: true, name: true },
  });

  if (!menuItem) {
    return { ok: false, error: "Không tìm thấy món cần xóa." };
  }

  const existingOrderItem = await prisma.orderItem.findFirst({
    where: { menuItemId: menuItem.id },
    select: { id: true },
  });

  if (existingOrderItem) {
    return {
      ok: false,
      error: "Món này đã xuất hiện trong đơn hàng nên chưa thể xóa. Bạn có thể chuyển món sang trạng thái tạm hết nếu cần ẩn khỏi menu.",
    };
  }

  await prisma.menuItem.delete({
    where: { id: menuItem.id },
  });

  revalidateMenuPaths();

  return { ok: true, message: `Đã xóa món ${menuItem.name}.` };
}

export async function deleteMenuCategoryAction(input: { categoryId: string }) {
  const session = await auth();

  if (session?.user?.role !== "ADMIN") {
    return { ok: false, error: "Bạn không có quyền xóa danh mục." };
  }

  const category = await prisma.menuCategory.findUnique({
    where: { id: input.categoryId },
    include: {
      _count: {
        select: {
          items: true,
        },
      },
    },
  });

  if (!category) {
    return { ok: false, error: "Không tìm thấy danh mục cần xóa." };
  }

  if (category._count.items > 0) {
    return { ok: false, error: "Chỉ xóa được danh mục đang trống. Hãy chuyển hoặc xóa hết món trong danh mục trước." };
  }

  await prisma.menuCategory.delete({
    where: { id: category.id },
  });

  revalidateMenuPaths();

  return { ok: true, message: `Đã xóa danh mục ${category.name}.` };
}

export async function createManualMenuItemAction(formData: FormData) {
  const session = await auth();

  if (session?.user?.role !== "ADMIN") {
    return { ok: false, error: "Bạn không có quyền thêm món thủ công." };
  }

  const parsed = createManualMenuItemSchema.safeParse({
    categoryId: typeof formData.get("categoryId") === "string" ? formData.get("categoryId") : undefined,
    newCategoryName: typeof formData.get("newCategoryName") === "string" ? formData.get("newCategoryName") : undefined,
    name: formData.get("name"),
    description: typeof formData.get("description") === "string" ? formData.get("description") : undefined,
    imageUrl: typeof formData.get("imageUrl") === "string" ? formData.get("imageUrl") : undefined,
    isAvailable: formData.get("isAvailable") === "on",
  });

  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Dữ liệu món không hợp lệ." };
  }

  const newCategoryName = parsed.data.newCategoryName?.trim() ?? "";
  const selectedCategoryId = parsed.data.categoryId?.trim() ?? "";

  if (!selectedCategoryId && !newCategoryName) {
    return { ok: false, error: "Hãy chọn danh mục có sẵn hoặc nhập tên danh mục mới." };
  }

  const result = await prisma
    .$transaction(async (tx) => {
      let categoryId = selectedCategoryId;
      let categoryName = "";

      if (newCategoryName) {
        const lastCategory = await tx.menuCategory.findFirst({
          orderBy: [{ sortOrder: "desc" }, { createdAt: "desc" }],
          select: { sortOrder: true },
        });

        const category = await tx.menuCategory.upsert({
          where: { name: newCategoryName },
          update: {},
          create: {
            name: newCategoryName,
            sortOrder: (lastCategory?.sortOrder ?? 0) + 1,
          },
          select: { id: true, name: true },
        });

        categoryId = category.id;
        categoryName = category.name;
      } else {
        const category = await tx.menuCategory.findUnique({
          where: { id: categoryId },
          select: { id: true, name: true },
        });

        if (!category) {
          throw new Error("Không tìm thấy danh mục đã chọn.");
        }

        categoryName = category.name;
      }

      const existingItem = await tx.menuItem.findFirst({
        where: {
          categoryId,
          name: parsed.data.name.trim(),
        },
        select: { id: true },
      });

      if (existingItem) {
        throw new Error("Món này đã tồn tại trong danh mục đã chọn.");
      }

      const lastItem = await tx.menuItem.findFirst({
        where: { categoryId },
        orderBy: [{ sortOrder: "desc" }, { createdAt: "desc" }],
        select: { sortOrder: true },
      });

      const item = await tx.menuItem.create({
        data: {
          categoryId,
          name: parsed.data.name.trim(),
          description: parsed.data.description?.trim() || null,
          imageUrl: parsed.data.imageUrl?.trim() || null,
          isAvailable: parsed.data.isAvailable,
          sortOrder: (lastItem?.sortOrder ?? 0) + 1,
        },
        select: { id: true, name: true },
      });

      await tx.menuItemVariant.createMany({
        data: [
          { menuItemId: item.id, name: "Cốc 500ml", sizeMl: 500, price: 30000, sortOrder: 1 },
          { menuItemId: item.id, name: "Cốc 700ml", sizeMl: 700, price: 40000, sortOrder: 2 },
        ],
      });

      return { itemName: item.name, categoryName };
    })
    .catch((error) => {
      return {
        error: error instanceof Error ? error.message : "Không thể thêm món thủ công lúc này.",
      };
    });

  if ("error" in result) {
    return { ok: false, error: result.error };
  }

  revalidateMenuPaths();

  return {
    ok: true,
    message: `Đã thêm món ${result.itemName} vào danh mục ${result.categoryName}.`,
  };
}
