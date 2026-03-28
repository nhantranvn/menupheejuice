"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { createOrderSchema } from "@/lib/validations/order";

type CreateOrderInput = {
  customerName: string;
  phoneNumber: string;
  deliveryAddress: string;
  note?: string;
  items: Array<{
    menuItemId: string;
    variantId: string;
    toppings: Array<{
      toppingId: string;
      quantity: number;
    }>;
    quantity: number;
  }>;
};

export async function createOrderAction(input: CreateOrderInput) {
  const session = await auth();
  const parsed = createOrderSchema.safeParse(input);

  if (!parsed.success) {
    return {
      ok: false,
      error: parsed.error.issues[0]?.message ?? "Dữ liệu đặt hàng không hợp lệ.",
    };
  }

  const customerName = parsed.data.customerName.trim();
  const phoneNumber = parsed.data.phoneNumber.trim();
  const deliveryAddress = parsed.data.deliveryAddress.trim();
  const note = parsed.data.note?.trim() || null;

  const uniqueVariantIds = Array.from(new Set(parsed.data.items.map((item) => item.variantId)));
  const uniqueToppingIds = Array.from(new Set(parsed.data.items.flatMap((item) => item.toppings.map((topping) => topping.toppingId))));

  const [variants, toppings] = await Promise.all([
    prisma.menuItemVariant.findMany({
      where: {
        id: { in: uniqueVariantIds },
        menuItem: {
          isAvailable: true,
        },
      },
      select: {
        id: true,
        name: true,
        price: true,
        menuItemId: true,
      },
    }),
    prisma.topping.findMany({
      where: {
        id: { in: uniqueToppingIds },
        isActive: true,
      },
      select: {
        id: true,
        name: true,
        price: true,
      },
    }),
  ]);

  if (variants.length !== uniqueVariantIds.length) {
    return { ok: false, error: "Một số size món không còn khả dụng. Vui lòng tải lại menu." };
  }

  if (toppings.length !== uniqueToppingIds.length) {
    return { ok: false, error: "Một số topping không còn khả dụng. Vui lòng tải lại menu." };
  }

  const variantMap = new Map(variants.map((variant) => [variant.id, variant]));
  const toppingMap = new Map(toppings.map((topping) => [topping.id, topping]));

  const orderItems = parsed.data.items.map((item) => {
    const variant = variantMap.get(item.variantId);

    if (!variant || variant.menuItemId !== item.menuItemId) {
      throw new Error("Size không khớp với món đã chọn.");
    }

    const selectedToppings = item.toppings.map((selectedTopping) => {
      const topping = toppingMap.get(selectedTopping.toppingId);

      if (!topping) {
        throw new Error("Topping không tồn tại hoặc đã bị tắt.");
      }

      return {
        toppingId: topping.id,
        name: topping.name,
        price: topping.price,
        quantity: selectedTopping.quantity,
        lineTotal: topping.price * selectedTopping.quantity,
      };
    });

    const unitPrice = variant.price + selectedToppings.reduce((sum, topping) => sum + topping.lineTotal, 0);

    return {
      menuItemId: item.menuItemId,
      menuItemVariantId: item.variantId,
      quantity: item.quantity,
      variantName: variant.name,
      unitPrice,
      toppings: selectedToppings,
    };
  });

  const totalAmount = orderItems.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);

  const orderUserId = session?.user?.id
    ? session.user.id
    : (
        await prisma.user.create({
          data: {
            name: customerName || "Khách vãng lai",
            role: "CUSTOMER",
          },
          select: {
            id: true,
          },
        })
      ).id;

  const order = await prisma.order.create({
    data: {
      userId: orderUserId,
      customerName,
      phoneNumber,
      deliveryAddress,
      note,
      totalAmount,
      items: {
        create: orderItems.map((item) => ({
          menuItemId: item.menuItemId,
          menuItemVariantId: item.menuItemVariantId,
          quantity: item.quantity,
          variantName: item.variantName,
          unitPrice: item.unitPrice,
          toppings: {
            create: item.toppings.map((topping) => ({
              toppingId: topping.toppingId,
              name: topping.name,
              price: topping.price,
              quantity: topping.quantity,
              lineTotal: topping.lineTotal,
            })),
          },
        })),
      },
    },
    select: {
      id: true,
      orderCode: true,
    },
  });

  return { ok: true, orderId: order.id, orderCode: order.orderCode };
}
