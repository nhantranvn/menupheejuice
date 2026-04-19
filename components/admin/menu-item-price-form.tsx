"use client";

import { useState, useTransition } from "react";
import { Banknote } from "lucide-react";
import { updateMenuItemPricesAction } from "@/lib/actions/menu-items";

type Props = {
  menuItemId: string;
  variants: Array<{
    id: string;
    name: string;
    price: number;
  }>;
};

export function MenuItemPriceForm({ menuItemId, variants }: Props) {
  const [message, setMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [prices, setPrices] = useState<Record<string, number>>(
    variants.reduce((acc, v) => ({ ...acc, [v.id]: v.price }), {})
  );

  return (
    <div className="space-y-3">
      <div className="rounded-3xl border border-stone-100 bg-stone-50/50 p-4">
        <p className="mb-3 text-xs font-medium uppercase tracking-wider text-stone-500">Cập nhật giá bán</p>
        <div className="grid gap-3">
          {variants.map((variant) => (
            <div key={variant.id} className="flex items-center gap-3">
              <label htmlFor={`price-${variant.id}`} className="min-w-[80px] text-sm text-stone-600">
                {variant.name}
              </label>
              <div className="relative flex-1">
                <input
                  id={`price-${variant.id}`}
                  type="number"
                  value={prices[variant.id]}
                  onChange={(e) => setPrices((prev) => ({ ...prev, [variant.id]: Number(e.target.value) }))}
                  className="input-field h-10 pr-10 text-sm"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-stone-400">
                  đ
                </span>
              </div>
            </div>
          ))}
        </div>
        
        <button
          type="button"
          disabled={isPending}
          className="button-secondary mt-4 h-11 w-full text-sm font-semibold"
          onClick={() => {
            setMessage(null);
            startTransition(async () => {
              const result = await updateMenuItemPricesAction({
                menuItemId,
                variants: variants.map((v) => ({ id: v.id, price: prices[v.id] })),
              });
              setMessage(result.ok ? result.message ?? "Đã lưu giá." : result.error ?? "Lỗi cập nhật.");
            });
          }}
        >
          <Banknote className="mr-2 h-4 w-4" />
          {isPending ? "Đang lưu..." : "Lưu thay đổi giá"}
        </button>
      </div>

      {message ? (
        <p className={`rounded-2xl px-4 py-3 text-sm ${message.includes("Lỗi") ? "bg-red-50 text-red-600" : "bg-stone-50 text-stone-600"}`}>
          {message}
        </p>
      ) : null}
    </div>
  );
}
