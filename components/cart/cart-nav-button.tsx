"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/components/cart/cart-provider";

export function CartNavButton() {
  const { itemCount } = useCart();

  return (
    <Link href="/cart" className="relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-stone-200 bg-white text-stone-700 transition hover:border-orange-300 hover:text-orange-600">
      <ShoppingBag className="h-5 w-5" />
      {itemCount > 0 ? (
        <span className="absolute -right-1 -top-1 inline-flex min-w-6 justify-center rounded-full bg-orange-600 px-1.5 py-1 text-xs font-semibold text-white">
          {itemCount}
        </span>
      ) : null}
    </Link>
  );
}

