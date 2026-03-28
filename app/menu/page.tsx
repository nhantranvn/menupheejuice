export const dynamic = "force-dynamic";

import Link from "next/link";
import { CategorySection } from "@/components/menu/category-section";
import { MenuCartBar } from "@/components/menu/menu-cart-bar";
import { prisma } from "@/lib/prisma";

function EmptyState({ title, description }: { title: string; description: string }) {
  return (
    <section className="mx-auto flex w-full max-w-4xl flex-1 items-center py-10">
      <div className="surface w-full p-8 sm:p-10">
        <span className="inline-flex rounded-full border border-stone-200 bg-white px-4 py-2 text-sm text-stone-600">
          Menu status
        </span>
        <h1 className="mt-5 text-4xl font-bold text-stone-950">{title}</h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-stone-600">{description}</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href="/admin/login" className="button-primary">
            Vao khu quan tri
          </Link>
          <Link href="/cart" className="button-secondary">
            Mo gio hang
          </Link>
        </div>
      </div>
    </section>
  );
}

export default async function MenuPage() {
  try {
    const [categories, toppings] = await Promise.all([
      prisma.menuCategory.findMany({
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

    if (!categories.length) {
      return (
        <EmptyState
          title="Menu hien chua co du lieu."
          description="Production database da ket noi thanh cong, nhung hien tai chua co danh muc hoac mon nao de hien thi cho khach. Ban co the dang nhap khu quan tri de them mon, cap nhat anh san pham, hoac seed du lieu ban dau neu day la database moi."
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
                <h1 className="text-3xl font-bold text-stone-950 sm:text-4xl">Cham vao mon de chon topping va upsize 700ml</h1>
                <p className="mt-3 max-w-3xl text-stone-600">
                  Khach co the xem menu va dat truc tiep khong can dang nhap. Mon nao het hang van se hien trong menu de de theo doi,
                  nhung se khong the them vao gio cho den khi quan mo ban lai.
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
        title="Menu tam thoi chua kha dung."
        description="Website da deploy thanh cong, nhung production database dang gap loi ket noi hoac schema chua san sang. Ban co the dang nhap khu quan tri sau khi kiem tra migration, seed du lieu, va DATABASE_URL tren Vercel."
      />
    );
  }
}
