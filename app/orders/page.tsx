export const dynamic = "force-dynamic";

import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { OrderSummaryCard } from "@/components/orders/order-summary-card";
import { prisma } from "@/lib/prisma";

export default async function OrdersPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/menu");
  }

  const orders = await prisma.order.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
    include: {
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
              price: true,
              quantity: true,
              lineTotal: true,
            },
          },
        },
      },
    },
  });

  return (
    <div className="space-y-6 py-4">
      <section className="surface p-6 sm:p-8">
        <p className="text-sm uppercase tracking-[0.2em] text-orange-600">Đơn của tôi</p>
        <div className="mt-3 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-4xl font-bold">Theo dõi lịch sử đặt món của bạn</h1>
            <p className="mt-3 max-w-2xl text-stone-600">
              Bạn có thể xem lại mã đơn số, người nhận, địa chỉ, size cốc, topping, tổng tiền và trạng thái xử lý của từng đơn.
            </p>
          </div>
          <Link href="/menu" className="button-primary">
            Đặt thêm món
          </Link>
        </div>
      </section>

      {orders.length === 0 ? (
        <section className="surface p-8 text-center">
          <p className="text-lg font-semibold">Bạn chưa có đơn hàng nào.</p>
          <p className="mt-2 text-stone-500">Khi đặt món thành công, lịch sử đơn sẽ hiện ở đây.</p>
          <div className="mt-6">
            <Link href="/menu" className="button-primary">
              Xem thực đơn
            </Link>
          </div>
        </section>
      ) : (
        <div className="space-y-5">
          {orders.map((order) => (
            <OrderSummaryCard key={order.id} order={order} title={`Đơn #${order.orderCode}`} />
          ))}
        </div>
      )}
    </div>
  );
}
