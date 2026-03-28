"use server";

import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { buildMenuItemImageStoragePaths } from "@/lib/uploads";
import {
  createManualMenuItemSchema,
  deleteMenuItemSchema,
  toggleMenuItemAvailabilitySchema,
  updateMenuItemImageSchema,
} from "@/lib/validations/menu-item";

const ALLOWED_IMAGE_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);

function revalidateMenuPaths() {
  revalidatePath("/");
  revalidatePath("/menu");
  revalidatePath("/admin/menu-items");
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

  const menuItem = await prisma.menuItem.update({
    where: { id: parsed.data.menuItemId },
    data: { isAvailable: parsed.data.isAvailable },
    select: { name: true, isAvailable: true },
  }).catch(() => null);

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

  const result = await prisma.$transaction(async (tx) => {
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
  }).catch((error) => {
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
