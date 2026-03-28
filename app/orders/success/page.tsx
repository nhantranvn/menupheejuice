export const dynamic = "force-dynamic";

import Link from "next/link";
import { auth } from "@/auth";

export default async function OrderSuccessPage({
  searchParams,
}: {
  searchParams: {
    orderCode?: string;
  };
}) {
  const session = await auth();

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-1 items-center py-10">
      <section className="surface w-full p-8 text-center sm:p-10">
        <span className="inline-flex rounded-full bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700">Dat mon thanh cong</span>
        <h1 className="mt-5 text-4xl font-bold">Quan da nhan duoc don hang cua ban.</h1>
        <p className="mt-4 text-lg leading-8 text-stone-600">
          Ma don cua ban la <span className="font-semibold text-stone-950">{searchParams.orderCode ? `#${searchParams.orderCode}` : "dang duoc tao"}</span>.
          Hay luu lai ma nay de quan ho tro tra cuu nhanh. Neu ban da dang nhap truoc do, don cung se xuat hien trong muc don cua toi.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/menu" className="button-primary">
            Dat them mon
          </Link>
          {session?.user ? (
            <Link href="/orders" className="button-secondary">
              Xem don cua toi
            </Link>
          ) : (
            <Link href="/cart" className="button-secondary">
              Quay lai gio hang
            </Link>
          )}
        </div>
      </section>
    </div>
  );
}
