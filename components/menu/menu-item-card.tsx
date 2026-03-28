"use client";

import { useMemo, useState } from "react";
import { Plus } from "lucide-react";
import { useCart } from "@/components/cart/cart-provider";
import { MenuItemConfigurator } from "@/components/menu/menu-item-configurator";
import { MENU_DESCRIPTION_BY_NAME } from "@/lib/menu-descriptions";
import { resolveMenuItemImageUrl } from "@/lib/menu-item-images";
import { formatCurrency } from "@/lib/utils";

type Props = {
  item: {
    id: string;
    name: string;
    description: string | null;
    imageUrl: string | null;
    isAvailable: boolean;
    variants: Array<{
      id: string;
      name: string;
      sizeMl: number;
      price: number;
    }>;
  };
  toppings: Array<{
    id: string;
    name: string;
    price: number;
  }>;
};

export function MenuItemCard({ item, toppings }: Props) {
  const [imageFailed, setImageFailed] = useState(false);
  const { items } = useCart();
  const baseVariant = item.variants.find((variant) => variant.sizeMl === 500) ?? item.variants[0];
  const displayDescription = MENU_DESCRIPTION_BY_NAME[item.name] ?? item.description ?? "Chọn topping và upsize 700ml khi mở món này.";
  const resolvedImageUrl = useMemo(() => resolveMenuItemImageUrl(item.imageUrl), [item.imageUrl]);
  const selectedCount = items.reduce((sum, cartItem) => (cartItem.menuItemId === item.id ? sum + cartItem.quantity : sum), 0);

  return (
    <article className={`border-b border-stone-200 bg-white py-4 last:border-b-0 sm:rounded-[1.75rem] sm:border sm:px-4 sm:shadow-sm ${item.isAvailable ? "" : "opacity-90"}`}>
      <MenuItemConfigurator
        item={item}
        toppings={toppings}
        disabled={!item.isAvailable}
        trigger={
          <div className="flex w-full items-center gap-4 text-left">
            <div className="aspect-square w-28 shrink-0 overflow-hidden rounded-[1.5rem] bg-stone-100 sm:w-32">
              {resolvedImageUrl && !imageFailed ? (
                <img src={resolvedImageUrl} alt={item.name} className="h-full w-full object-cover object-center" onError={() => setImageFailed(true)} />
              ) : (
                <div className="flex h-full items-center justify-center px-3 text-center text-sm font-medium text-stone-500">{item.name}</div>
              )}
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="line-clamp-2 text-[1.35rem] font-semibold leading-tight text-stone-950 sm:text-2xl">{item.name}</h3>
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${item.isAvailable ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>
                  {item.isAvailable ? "Đang phục vụ" : "Hết hàng"}
                </span>
              </div>
              <p className="mt-2 line-clamp-2 text-sm leading-6 text-stone-500 sm:text-lg">{displayDescription}</p>
              <div className="mt-3 flex items-end justify-between gap-3">
                <div>
                  <p className="text-[1.6rem] font-bold leading-none text-stone-950 sm:text-[2rem]">{formatCurrency(baseVariant?.price ?? 0)}</p>
                  <p className="mt-2 text-sm text-stone-400">{item.isAvailable ? "Chạm để thêm topping và upsize" : "Món này hiện đang hết hàng"}</p>
                </div>
                <span
                  className={`inline-flex h-14 min-w-14 shrink-0 items-center justify-center rounded-full px-3 text-lg font-semibold transition ${
                    selectedCount > 0
                      ? "border-2 border-emerald-500 bg-white text-emerald-700 shadow-[0_10px_26px_-18px_rgba(16,185,129,0.6)]"
                      : item.isAvailable
                        ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/30"
                        : "bg-stone-300 text-white shadow-none"
                  }`}
                >
                  {selectedCount > 0 ? selectedCount : <Plus className="h-7 w-7" />}
                </span>
              </div>
            </div>
          </div>
        }
      />
    </article>
  );
}
