"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import {
  deleteToppingSchema,
  toggleToppingAvailabilitySchema,
  toppingSchema,
} from "@/lib/validations/topping";

function revalidateMenuPaths() {
  revalidatePath("/");
  revalidatePath("/menu");
  revalidatePath("/admin/toppings");
}

export async function upsertToppingAction(formData: FormData) {
  const session = await auth();

  if (session?.user?.role !== "ADMIN") {
    return { ok: false, error: "Bạn không có quyền quản lý topping." };
  }

  const rawData = {
    id: formData.get("id")?.toString() || undefined,
    name: formData.get("name")?.toString(),
    price: formData.get("price"),
    sortOrder: formData.get("sortOrder") || 0,
    isActive: formData.get("isActive") === "on",
  };

  const parsed = toppingSchema.safeParse(rawData);

  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Dữ liệu topping không hợp lệ." };
  }

  const { id, ...data } = parsed.data;

  try {
    if (id) {
      await prisma.topping.update({
        where: { id },
        data,
      });
    } else {
      await prisma.topping.create({
        data,
      });
    }

    revalidateMenuPaths();
    return { ok: true, message: id ? "Đã cập nhật topping." : "Đã thêm topping mới." };
  } catch (error) {
    return { ok: false, error: "Tên topping đã tồn tại hoặc có lỗi xảy ra." };
  }
}

export async function toggleToppingAvailabilityAction(input: { toppingId: string; isActive: boolean }) {
  const session = await auth();

  if (session?.user?.role !== "ADMIN") {
    return { ok: false, error: "Bạn không có quyền cập nhật trạng thái topping." };
  }

  const parsed = toggleToppingAvailabilitySchema.safeParse(input);

  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Dữ liệu không hợp lệ." };
  }

  try {
    const topping = await prisma.topping.update({
      where: { id: parsed.data.toppingId },
      data: { isActive: parsed.data.isActive },
    });

    revalidateMenuPaths();
    return {
      ok: true,
      message: topping.isActive
        ? `Đã bật topping ${topping.name}.`
        : `Đã tạm ẩn topping ${topping.name}.`,
    };
  } catch (error) {
    return { ok: false, error: "Không tìm thấy topping." };
  }
}

export async function deleteToppingAction(input: { toppingId: string }) {
  const session = await auth();

  if (session?.user?.role !== "ADMIN") {
    return { ok: false, error: "Bạn không có quyền xóa topping." };
  }

  const parsed = deleteToppingSchema.safeParse(input);

  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Dữ liệu không hợp lệ." };
  }

  try {
    // Kiểm tra xem topping đã có trong đơn hàng chưa
    const usedInOrder = await prisma.orderItemTopping.findFirst({
      where: { toppingId: parsed.data.toppingId },
    });

    if (usedInOrder) {
      return {
        ok: false,
        error: "Topping này đã có trong đơn hàng, không thể xóa. Bạn có thể tạm ẩn nó thay vì xóa.",
      };
    }

    await prisma.topping.delete({
      where: { id: parsed.data.toppingId },
    });

    revalidateMenuPaths();
    return { ok: true, message: "Đã xóa topping." };
  } catch (error) {
    return { ok: false, error: "Có lỗi xảy ra khi xóa topping." };
  }
}
