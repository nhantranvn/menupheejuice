import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(_request: Request, { params }: { params: { orderId: string } }) {
  const session = await auth();

  if (!session?.user || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const order = await prisma.order.findUnique({
    where: { id: params.orderId },
    include: {
      user: {
        select: {
          name: true,
          email: true,
        },
      },
      items: {
        include: {
          menuItem: {
            select: {
              name: true,
            },
          },
          toppings: {
            select: {
              name: true,
              quantity: true,
              lineTotal: true,
            },
          },
        },
      },
    },
  });

  if (!order) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }

  return NextResponse.json({
    order: {
      id: order.id,
      orderCode: order.orderCode,
      customerName: order.customerName,
      phoneNumber: order.phoneNumber,
      deliveryAddress: order.deliveryAddress,
      note: order.note,
      totalAmount: order.totalAmount,
      status: order.status,
      createdAt: order.createdAt.toISOString(),
      customer: order.user
        ? {
            name: order.user.name,
            email: order.user.email,
          }
        : null,
      items: order.items.map((item) => ({
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        variantName: item.variantName,
        note: item.note,
        menuItem: {
          name: item.menuItem.name,
        },
        toppings: item.toppings.map((topping) => ({
          name: topping.name,
          quantity: topping.quantity,
          lineTotal: topping.lineTotal,
        })),
      })),
    },
  });
}
