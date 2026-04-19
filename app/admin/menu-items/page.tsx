export const dynamic = "force-dynamic";

import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { InitializeStarterMenuButton } from "@/components/admin/initialize-starter-menu-button";
import { ManualMenuItemForm } from "@/components/admin/manual-menu-item-form";
import { MenuCategoryDangerActions } from "@/components/admin/menu-category-danger-actions";
import { MenuItemAvailabilityToggle } from "@/components/admin/menu-item-availability-toggle";
import { MenuItemDangerActions } from "@/components/admin/menu-item-danger-actions";
import { MenuItemImageForm } from "@/components/admin/menu-item-image-form";
import { MenuItemPriceForm } from "@/components/admin/menu-item-price-form";
import { MenuItemPreviewImage } from "@/components/admin/menu-item-preview-image";
import { STARTER_MENU, STARTER_MENU_TOTAL_ITEMS } from "@/lib/constants/starter-menu";
import { prisma } from "@/lib/prisma";

function hasCatalogImage(imageUrl: string | null) {
  return Boolean(imageUrl && !imageUrl.startsWith("https://placehold.co/"));
}

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

  const visibleCategories = categories.filter((category) => category.items.length > 0);
  const emptyCategories = categories.filter((category) => category.items.length === 0);
  const totalItems = visibleCategories.reduce((sum, category) => sum + category.items.length, 0);
  const itemsWithCatalogImages = visibleCategories.reduce(
    (sum, category) => sum + category.items.filter((item) => hasCatalogImage(item.imageUrl)).length,
    0,
  );
  const targetImageCount = STARTER_MENU.reduce(
    (sum, category) => sum + category.items.filter((item) => hasCatalogImage(item.imageUrl ?? null)).length,
    0,
  );
  const remainingStarterItems = Math.max(STARTER_MENU_TOTAL_ITEMS - totalItems, 0);
  const needsStarterSync = remainingStarterItems > 0 || itemsWithCatalogImages < targetImageCount;

  return (
    <div className="space-y-6 py-4">
      <section className="surface p-6 sm:p-8">
        <p className="text-sm uppercase tracking-[0.2em] text-orange-600">Ảnh thực đơn</p>
        <div className="mt-3 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-4xl font-bold">Cập nhật ảnh thật và quản lý menu thủ công</h1>
            <p className="mt-3 max-w-3xl text-stone-600">
              Đây là nơi bạn đồng bộ menu gốc, thêm món mới, tải ảnh thật, đánh dấu hết hàng hoặc xoá các món
              chưa dùng trong đơn hàng.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/admin/orders" className="button-secondary">
              Xem đơn hàng
            </Link>
          </div>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-3xl bg-stone-50 px-5 py-4">
            <p className="text-sm text-stone-500">Tổng số món hiện có</p>
            <p className="mt-1 text-2xl font-bold">{totalItems}</p>
          </div>
          <div className="rounded-3xl bg-stone-50 px-5 py-4">
            <p className="text-sm text-stone-500">Mục tiêu menu gốc</p>
            <p className="mt-1 text-2xl font-bold">{STARTER_MENU_TOTAL_ITEMS}</p>
          </div>
          <div className="rounded-3xl bg-stone-50 px-5 py-4">
            <p className="text-sm text-stone-500">Có ảnh sản phẩm</p>
            <p className="mt-1 text-2xl font-bold">{itemsWithCatalogImages}</p>
          </div>
          <div className="rounded-3xl bg-stone-50 px-5 py-4">
            <p className="text-sm text-stone-500">Còn thiếu so với menu gốc</p>
            <p className="mt-1 text-2xl font-bold">{remainingStarterItems}</p>
          </div>
        </div>
      </section>

      {needsStarterSync ? (
        <InitializeStarterMenuButton
          currentCount={totalItems}
          targetCount={STARTER_MENU_TOTAL_ITEMS}
          currentImageCount={itemsWithCatalogImages}
          targetImageCount={targetImageCount}
        />
      ) : null}

      {emptyCategories.length > 0 ? (
        <section className="surface p-6 sm:p-8">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-orange-600">Dọn dữ liệu thừa</p>
              <h2 className="mt-2 text-2xl font-bold">Danh mục đang trống</h2>
            </div>
            <p className="text-sm text-stone-500">Những danh mục này không còn món nào và có thể xóa để web gọn lại.</p>
          </div>
          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            {emptyCategories.map((category) => (
              <article key={category.id} className="rounded-3xl border border-stone-200 bg-white p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-stone-900">{category.name}</h3>
                    <p className="mt-1 text-sm text-stone-500">0 món • sort {category.sortOrder}</p>
                  </div>
                </div>
                <div className="mt-4">
                  <MenuCategoryDangerActions categoryId={category.id} categoryName={category.name} />
                </div>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      <section className="surface p-6 sm:p-8">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-orange-600">Danh mục menu</p>
            <h2 className="mt-2 text-2xl font-bold">Danh sách danh mục để thao tác nhanh</h2>
          </div>
          <p className="text-sm text-stone-500">Bấm vào từng danh mục để nhảy nhanh đến đúng nhóm món bên dưới.</p>
        </div>

        {visibleCategories.length === 0 ? (
          <div className="mt-6 rounded-3xl border border-dashed border-stone-300 bg-stone-50 p-6 text-sm text-stone-500">
            Chưa có danh mục nào trong production. Bạn có thể đồng bộ menu gốc ở phía trên hoặc tạo danh mục mới thủ công.
          </div>
        ) : (
          <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {visibleCategories.map((category) => (
              <a
                key={category.id}
                href={`#category-${category.id}`}
                className="rounded-3xl border border-stone-200 bg-white px-5 py-4 transition hover:border-orange-200 hover:bg-orange-50/40"
              >
                <p className="font-semibold text-stone-900">{category.name}</p>
                <p className="mt-1 text-sm text-stone-500">{category.items.length} món</p>
              </a>
            ))}
          </div>
        )}
      </section>

      <ManualMenuItemForm categories={visibleCategories.map((category) => ({ id: category.id, name: category.name }))} />

      <div className="space-y-8">
        {visibleCategories.map((category) => (
          <section key={category.id} id={`category-${category.id}`} className="surface overflow-hidden">
            <div className="flex flex-col gap-3 border-b border-stone-100 p-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-orange-600">Danh mục</p>
                <h2 className="mt-2 text-3xl font-bold">{category.name}</h2>
              </div>
              <p className="text-sm text-stone-500">{category.items.length} món trong danh mục này</p>
            </div>

            <div className="divide-y divide-stone-100">
              {category.items.map((item) => (
                <article key={item.id} className="grid gap-5 p-6 xl:grid-cols-[132px_minmax(0,1fr)_260px] xl:items-start">
                  <div className="w-full max-w-[132px]">
                    <MenuItemPreviewImage imageUrl={item.imageUrl} name={item.name} />
                  </div>

                  <div className="space-y-3">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div className="max-w-3xl">
                        <h3 className="text-xl font-semibold text-stone-900">{item.name}</h3>
                        <p className="mt-2 text-sm leading-6 text-stone-500">
                          {item.description ?? "Chưa có mô tả. Bạn có thể cập nhật mô tả sau nếu cần."}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-medium ${
                            item.isAvailable ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"
                          }`}
                        >
                          {item.isAvailable ? "Đang phục vụ" : "Hết hàng"}
                        </span>
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-medium ${
                            hasCatalogImage(item.imageUrl) ? "bg-sky-50 text-sky-700" : "bg-stone-100 text-stone-600"
                          }`}
                        >
                          {hasCatalogImage(item.imageUrl) ? "Có ảnh sản phẩm" : "Ảnh tạm hoặc chưa có"}
                        </span>
                      </div>
                    </div>

                    <p className="text-sm text-stone-500">
                      Size: {item.variants.map((variant) => `${variant.name} (${variant.price.toLocaleString("vi-VN")}đ)`).join(" • ")}
                    </p>
                  </div>

                  <div className="grid gap-3">
                    <MenuItemImageForm menuItemId={item.id} />
                    <MenuItemPriceForm menuItemId={item.id} variants={item.variants.map(v => ({ id: v.id, name: v.name, price: v.price }))} />
                    <MenuItemAvailabilityToggle menuItemId={item.id} menuItemName={item.name} isAvailable={item.isAvailable} />
                    <MenuItemDangerActions menuItemId={item.id} menuItemName={item.name} />
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
