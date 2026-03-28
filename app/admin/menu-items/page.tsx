export const dynamic = "force-dynamic";

import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { InitializeStarterMenuButton } from "@/components/admin/initialize-starter-menu-button";
import { ManualMenuItemForm } from "@/components/admin/manual-menu-item-form";
import { MenuItemAvailabilityToggle } from "@/components/admin/menu-item-availability-toggle";
import { MenuItemDangerActions } from "@/components/admin/menu-item-danger-actions";
import { MenuItemImageForm } from "@/components/admin/menu-item-image-form";
import { MenuItemPreviewImage } from "@/components/admin/menu-item-preview-image";
import { prisma } from "@/lib/prisma";

export default async function AdminMenuItemsPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/admin/login");
  }

  if (session.user.role !== "ADMIN") {
    redirect("/menu");
  }

  const categories = await prisma.menuCategory.findMany({
    orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
    include: {
      items: {
        orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
        include: {
          variants: {
            orderBy: [{ sortOrder: "asc" }, { sizeMl: "asc" }],
          },
        },
      },
    },
  });

  const totalItems = categories.reduce((sum, category) => sum + category.items.length, 0);
  const itemsWithImages = categories.reduce(
    (sum, category) => sum + category.items.filter((item) => Boolean(item.imageUrl)).length,
    0,
  );

  return (
    <div className="space-y-6 py-4">
      <section className="surface p-6 sm:p-8">
        <p className="text-sm uppercase tracking-[0.2em] text-orange-600">Anh thuc don</p>
        <div className="mt-3 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-4xl font-bold">Cap nhat anh that va nhap mon thu cong</h1>
            <p className="mt-3 max-w-3xl text-stone-600">
              Tai day, ban co the them mon moi bang tay, tai anh that, danh dau het hang hoac xoa cac mon chua dung trong don hang.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/admin/menu-import" className="button-secondary">
              OCR menu tu anh
            </Link>
            <Link href="/admin/orders" className="button-secondary">
              Xem don hang
            </Link>
          </div>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-3xl bg-stone-50 px-5 py-4">
            <p className="text-sm text-stone-500">Tong so mon</p>
            <p className="mt-1 text-2xl font-bold">{totalItems}</p>
          </div>
          <div className="rounded-3xl bg-stone-50 px-5 py-4">
            <p className="text-sm text-stone-500">Da co anh that</p>
            <p className="mt-1 text-2xl font-bold">{itemsWithImages}</p>
          </div>
          <div className="rounded-3xl bg-stone-50 px-5 py-4">
            <p className="text-sm text-stone-500">Con thieu anh</p>
            <p className="mt-1 text-2xl font-bold">{totalItems - itemsWithImages}</p>
          </div>
        </div>
      </section>

      {totalItems === 0 ? <InitializeStarterMenuButton /> : null}

      <ManualMenuItemForm categories={categories.map((category) => ({ id: category.id, name: category.name }))} />

      <div className="space-y-8">
        {categories.map((category) => (
          <section key={category.id} className="space-y-4">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-orange-600">Danh muc</p>
                <h2 className="mt-2 text-3xl font-bold">{category.name}</h2>
              </div>
              <p className="text-sm text-stone-500">{category.items.length} mon</p>
            </div>

            <div className="grid gap-5 lg:grid-cols-2">
              {category.items.map((item) => (
                <article key={item.id} className="surface p-5">
                  <div className="grid gap-5 xl:grid-cols-[180px_1fr] xl:items-start">
                    <div className="w-full max-w-[180px] self-start">
                      <MenuItemPreviewImage imageUrl={item.imageUrl} name={item.name} />
                    </div>

                    <div className="space-y-4">
                      <div>
                        <div className="flex flex-wrap items-start justify-between gap-3">
                          <div>
                            <h3 className="text-xl font-semibold">{item.name}</h3>
                            <p className="mt-2 text-sm text-stone-500">
                              {item.description ?? "Chua co mo ta. Ban co the cap nhat mo ta sau."}
                            </p>
                          </div>
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-medium ${
                              item.isAvailable ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"
                            }`}
                          >
                            {item.isAvailable ? "Dang phuc vu" : "Het hang"}
                          </span>
                        </div>
                        <p className="mt-3 text-sm text-stone-500">
                          Size: {item.variants.map((variant) => `${variant.name} (${variant.price.toLocaleString("vi-VN")}d)`).join(" • ")}
                        </p>
                      </div>

                      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_220px] xl:items-start">
                        <MenuItemImageForm menuItemId={item.id} />
                        <div className="grid gap-3">
                          <MenuItemAvailabilityToggle menuItemId={item.id} menuItemName={item.name} isAvailable={item.isAvailable} />
                          <MenuItemDangerActions menuItemId={item.id} menuItemName={item.name} />
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

