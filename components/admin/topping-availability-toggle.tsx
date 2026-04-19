"use client";

import { useState, useTransition } from "react";
import { BadgeX, CheckCircle2 } from "lucide-react";
import { toggleToppingAvailabilityAction } from "@/lib/actions/toppings";

type Props = {
  toppingId: string;
  toppingName: string;
  isActive: boolean;
};

export function ToppingAvailabilityToggle({ toppingId, toppingName, isActive }: Props) {
  const [message, setMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  return (
    <div className="space-y-3">
      <button
        type="button"
        disabled={isPending}
        className={`inline-flex h-12 w-full items-center justify-center rounded-full px-4 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60 ${
          isActive
            ? "border border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100"
            : "border border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
        }`}
        onClick={() => {
          setMessage(null);
          startTransition(async () => {
            const result = await toggleToppingAvailabilityAction({ toppingId, isActive: !isActive });
            setMessage(
              result.ok
                ? result.message ?? "Đã cập nhật trạng thái topping."
                : result.error ?? `Không thể cập nhật trạng thái topping ${toppingName}.`,
            );
          });
        }}
      >
        {isActive ? <BadgeX className="mr-2 h-4 w-4" /> : <CheckCircle2 className="mr-2 h-4 w-4" />}
        {isPending ? "Đang cập nhật..." : isActive ? "Tạm ẩn topping" : "Mở bán topping"}
      </button>

      {message ? <p className="rounded-2xl bg-stone-50 px-4 py-3 text-sm text-stone-600">{message}</p> : null}
    </div>
  );
}
