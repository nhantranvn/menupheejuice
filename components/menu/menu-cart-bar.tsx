"use client";

import Link from "next/link";
import { useCart } from "@/components/cart/cart-provider";
import { formatCurrency } from "@/lib/utils";

export function MenuCartBar() {
  const { itemCount, totalAmount } = useCart();

  if (itemCount === 0) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 px-4 pb-4 pt-6 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-4xl">
        <Link
          href="/cart"
          className="pointer-events-auto flex items-center justify-between rounded-[1.6rem] bg-emerald-500 px-6 py-4 text-white shadow-[0_18px_40px_-18px_rgba(16,185,129,0.75)] transition hover:bg-emerald-600"
        >
          <div>
            <p className="text-base font-semibold">{`Giỏ hàng • ${itemCount} món`}</p>
            <p className="mt-1 text-sm text-emerald-100">{"Xem topping, ghi chú và đặt món"}</p>
          </div>
          <span className="text-2xl font-bold">{formatCurrency(totalAmount)}</span>
        </Link>
      </div>
    </div>
  );
}