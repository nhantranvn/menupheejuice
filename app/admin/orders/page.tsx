export const dynamic = "force-dynamic";

import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { OrderCard } from "@/components/admin/order-card";
import { prisma } from "@/lib/prisma";

export default async function AdminOrdersPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/admin/login");
  }

  if (session.user.role !== "ADMIN") {
    redirect("/menu");
  }

  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
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
        <p className="text-sm uppercase tracking-[0.2em] text-orange-600">Khu quan tri</p>
        <div className="mt-3 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-4xl font-bold">Quan ly don hang moi nhat</h1>
            <p className="mt-3 max-w-2xl text-stone-600">
              Quan tri vien co the xem ma don so, nguoi nhan, so dien thoai, dia chi, topping, tong tien va doi trang thai don theo tung giai doan.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/admin/menu-items" className="button-secondary">
              Cap nhat anh mon
            </Link>
            <Link href="/admin/menu-import" className="button-secondary">
              Nhap menu tu anh
            </Link>
            <div className="rounded-3xl bg-stone-50 px-5 py-4">
              <p className="text-sm text-stone-500">Tong so don</p>
              <p className="text-2xl font-bold">{orders.length}</p>
            </div>
          </div>
        </div>
      </section>

      {orders.length === 0 ? (
        <section className="surface p-8 text-center">
          <p className="text-lg font-semibold">Chua co don hang nao.</p>
          <p className="mt-2 text-stone-500">Khi khach dat mon, danh sach don se xuat hien tai day.</p>
        </section>
      ) : (
        <div className="space-y-5">
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
}
