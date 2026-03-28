import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { VIETNAM_TIME_ZONE } from "@/lib/utils";

export const dynamic = "force-dynamic";

export async function GET() {
  const session = await auth();

  if (!session?.user || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const [latestOrder, newOrderCount] = await Promise.all([
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
  ]);

  return NextResponse.json({
    latestOrder: latestOrder
      ? {
          ...latestOrder,
          createdAt: latestOrder.createdAt.toISOString(),
        }
      : null,
    newOrderCount,
    timeZone: VIETNAM_TIME_ZONE,
  });
}
