export const dynamic = "force-dynamic";

import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { ManualToppingForm } from "@/components/admin/manual-topping-form";
import { ToppingAvailabilityToggle } from "@/components/admin/topping-availability-toggle";
import { ToppingActions } from "@/components/admin/topping-actions";

export default async function AdminToppingsPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/admin/login");
  }

  if (session.user.role !== "ADMIN") {
    redirect("/menu");
  }

  const toppings = await prisma.topping.findMany({
    orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
  });

  return (
    <div className="space-y-6 py-4">
      <section className="surface p-6 sm:p-8">
        <p className="text-sm uppercase tracking-[0.2em] text-orange-600">Quản lý Topping</p>
        <div className="mt-3 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-4xl font-bold">Thêm, sửa và xóa Topping</h1>
            <p className="mt-3 max-w-3xl text-stone-600">
              Đây là nơi bạn quản lý danh sách các loại topping đi kèm với đồ uống. 
              Bạn có thể điều chỉnh giá, thay đổi thứ tự hoặc tạm ẩn các loại topping hiện có.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/admin/menu-items" className="button-secondary">
              Quản lý menu món
            </Link>
          </div>
        </div>
      </section>

      <ManualToppingForm />

      <section className="surface p-0 overflow-hidden">
        <div className="flex flex-col gap-3 border-b border-stone-100 p-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-orange-600">Danh sách topping</p>
            <h2 className="mt-2 text-3xl font-bold">Topping hiện có</h2>
          </div>
          <p className="text-sm text-stone-500">{toppings.length} loại topping</p>
        </div>

        <div className="divide-y divide-stone-100">
          {toppings.length === 0 ? (
            <div className="p-12 text-center text-stone-500">
              Chưa có topping nào. Hãy thêm topping mới bằng form ở trên.
            </div>
          ) : (
            toppings.map((topping) => (
              <article key={topping.id} className="grid gap-5 p-6 xl:grid-cols-[1fr_260px] xl:items-start">
                <div className="space-y-3">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="max-w-3xl">
                      <h3 className="text-xl font-semibold text-stone-900">{topping.name}</h3>
                      <p className="mt-2 text-2xl font-bold text-orange-600">
                        {topping.price.toLocaleString("vi-VN")}đ
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          topping.isActive ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"
                        }`}
                      >
                        {topping.isActive ? "Đang phục vụ" : "Tạm ẩn"}
                      </span>
                      <span className="rounded-full bg-stone-100 px-3 py-1 text-xs font-medium text-stone-600">
                        Thứ tự: {topping.sortOrder}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid gap-3">
                  <ToppingAvailabilityToggle 
                    toppingId={topping.id} 
                    toppingName={topping.name} 
                    isActive={topping.isActive} 
                  />
                  <ToppingActions topping={topping} />
                </div>
              </article>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
