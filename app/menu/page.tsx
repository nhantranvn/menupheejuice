export const dynamic = "force-dynamic";

import Link from "next/link";
import { CategorySection } from "@/components/menu/category-section";
import { MenuCartBar } from "@/components/menu/menu-cart-bar";
import { prisma } from "@/lib/prisma";

function normalizeToppingName(name: string) {
  return name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
}

function hasVietnameseMarks(name: string) {
  return name.normalize("NFD").replace(/[\u0300-\u036f]/g, "") !== name || /[đĐ]/.test(name);
}

function EmptyState({ title, description }: { title: string; description: string }) {
  return (
    <section className="mx-auto flex w-full max-w-4xl flex-1 items-center py-10">
      <div className="surface w-full p-8 sm:p-10">
        <span className="inline-flex rounded-full border border-stone-200 bg-white px-4 py-2 text-sm text-stone-600">
          Trạng thái menu
        </span>
        <h1 className="mt-5 text-4xl font-bold text-stone-950">{title}</h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-stone-600">{description}</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href="/admin/login" className="button-primary">
            Vào khu quản trị
          </Link>
          <Link href="/cart" className="button-secondary">
            Mở giỏ hàng
          </Link>
        </div>
      </div>
    </section>
  );
}

export default async function MenuPage() {
  try {
    const [categoriesRaw, rawToppings] = await Promise.all([
      prisma.menuCategory.findMany({
        orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
        include: {
          items: {
            orderBy: [{ sortOrder: "asc" }],
            include: {
              menuItem: {
                include: {
                  variants: {
                    orderBy: [{ sortOrder: "asc" }, { sizeMl: "asc" }],
                  },
                },
              },
            },
          },
        },
      }),
      prisma.topping.findMany({
        where: { isActive: true },
        orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
        select: {
          id: true,
          name: true,
          price: true,
        },
      }),
    ]);

    const toppings = Array.from(
      rawToppings
        .reduce((map, topping) => {
          const key = normalizeToppingName(topping.name);
          const current = map.get(key);

          if (!current) {
            map.set(key, topping);
            return map;
          }

          if (!hasVietnameseMarks(current.name) && hasVietnameseMarks(topping.name)) {
            map.set(key, topping);
          }

          return map;
        }, new Map<string, (typeof rawToppings)[number]>())
        .values(),
    );

    const categories = categoriesRaw.map((cat) => ({
      ...cat,
      items: cat.items.map((link) => link.menuItem),
    }));

    if (!categories.length) {
      return (
        <EmptyState
          title="Menu hiện chưa có dữ liệu."
          description="Production database đã kết nối thành công, nhưng hiện tại chưa có danh mục hoặc món nào để hiển thị cho khách. Bạn có thể đăng nhập khu quản trị để thêm món, cập nhật ảnh sản phẩm, hoặc seed dữ liệu ban đầu nếu đây là database mới."
        />
      );
    }

    return (
      <>
        <div className="space-y-8 py-4 pb-28">
          <section className="rounded-[2rem] border border-stone-200 bg-white px-4 py-5 shadow-[0_16px_40px_-28px_rgba(28,25,23,0.35)] sm:px-6 sm:py-6">
            <p className="text-sm uppercase tracking-[0.2em] text-orange-600">PHEE JUICE MENU</p>
            <div className="mt-3 flex flex-col gap-4">
              <div>
                <h1 className="text-3xl font-bold text-stone-950 sm:text-4xl">Chạm vào món để chọn topping và upsize 700ml</h1>
                <p className="mt-3 max-w-3xl text-stone-600">
                  Khách có thể xem menu và đặt trực tiếp không cần đăng nhập. Món nào hết hàng vẫn sẽ hiện trong menu để dễ theo dõi,
                  nhưng sẽ không thể thêm vào giỏ cho đến khi quán mở bán lại.
                </p>
              </div>
              <div className="flex gap-3 overflow-x-auto pb-1">
                {categories.map((category) => (
                  <a
                    key={category.id}
                    href={`#${category.id}`}
                    className="shrink-0 rounded-full border border-stone-300 bg-white px-5 py-3 text-sm font-semibold text-stone-700 transition hover:border-orange-300 hover:text-orange-700"
                  >
                    {category.name}
                  </a>
                ))}
              </div>
            </div>
          </section>

          <div className="space-y-10">
            {categories.map((category) => (
              <CategorySection key={category.id} category={category} toppings={toppings} />
            ))}
          </div>
        </div>

        <MenuCartBar />
      </>
    );
  } catch (error) {
    console.error("MenuPage runtime error", error);

    return (
      <EmptyState
        title="Menu tạm thời chưa khả dụng."
        description="Website đã deploy thành công, nhưng production database đang gặp lỗi kết nối hoặc schema chưa sẵn sàng. Bạn có thể đăng nhập khu quản trị sau khi kiểm tra migration, seed dữ liệu, và DATABASE_URL trên Vercel."
      />
    );
  }
}
