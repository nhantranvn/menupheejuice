import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { VIETNAM_TIME_ZONE } from "@/lib/utils";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const session = await auth();

  if (!session?.user || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const afterOrderCodeParam = Number(searchParams.get("afterOrderCode"));
  const afterOrderCode = Number.isFinite(afterOrderCodeParam) ? afterOrderCodeParam : 0;

  const [latestOrder, newOrderCount, newOrders] = await Promise.all([
    prisma.order.findFirst({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        orderCode: true,
        customerName: true,
        totalAmount: true,
        createdAt: true,
      },
    }),
    prisma.order.count({
      where: { status: "NEW" },
    }),
    prisma.order.findMany({
      where: afterOrderCode > 0 ? { orderCode: { gt: afterOrderCode } } : undefined,
      orderBy: { orderCode: "asc" },
      select: {
        id: true,
        orderCode: true,
        customerName: true,
        totalAmount: true,
        createdAt: true,
      },
    }),
  ]);

  return NextResponse.json({
    latestOrder: latestOrder
      ? {
          ...latestOrder,
          createdAt: latestOrder.createdAt.toISOString(),
        }
      : null,
    newOrders: newOrders.map((order) => ({
      ...order,
      createdAt: order.createdAt.toISOString(),
    })),
    newOrderCount,
    timeZone: VIETNAM_TIME_ZONE,
  });
}
