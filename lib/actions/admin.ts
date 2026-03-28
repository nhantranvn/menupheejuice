"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { updateOrderStatusSchema } from "@/lib/validations/order";

export async function updateOrderStatusAction(input: { orderId: string; status: "NEW" | "PREPARING" | "COMPLETED" | "CANCELLED" }) {
  const session = await auth();

  if (session?.user?.role !== "ADMIN") {
    return { ok: false, error: "Ban khong co quyen cap nhat trang thai don hang." };
  }

  const parsed = updateOrderStatusSchema.safeParse(input);

  if (!parsed.success) {
    return { ok: false, error: "Du lieu cap nhat khong hop le." };
  }

  await prisma.order.update({
    where: { id: parsed.data.orderId },
    data: { status: parsed.data.status },
  });

  revalidatePath("/admin/orders");

  return { ok: true };
}

