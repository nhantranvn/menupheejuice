"use client";

import { useState, useTransition } from "react";
import { BadgeX, CheckCircle2 } from "lucide-react";
import { toggleMenuItemAvailabilityAction } from "@/lib/actions/menu-items";

type Props = {
  menuItemId: string;
  menuItemName: string;
  isAvailable: boolean;
};

export function MenuItemAvailabilityToggle({ menuItemId, menuItemName, isAvailable }: Props) {
  const [message, setMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  return (
    <div className="space-y-3">
      <button
        type="button"
        disabled={isPending}
        className={`inline-flex h-12 w-full items-center justify-center rounded-full px-4 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60 ${
          isAvailable
            ? "border border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100"
            : "border border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
        }`}
        onClick={() => {
          setMessage(null);
          startTransition(async () => {
            const result = await toggleMenuItemAvailabilityAction({ menuItemId, isAvailable: !isAvailable });
            setMessage(
              result.ok
                ? result.message ?? "Đã cập nhật trạng thái món."
                : result.error ?? `Không thể cập nhật trạng thái món ${menuItemName}.`,
            );
          });
        }}
      >
        {isAvailable ? <BadgeX className="mr-2 h-4 w-4" /> : <CheckCircle2 className="mr-2 h-4 w-4" />}
        {isPending ? "Đang cập nhật..." : isAvailable ? "Đánh dấu hết hàng" : "Mở bán lại"}
      </button>

      {message ? <p className="rounded-2xl bg-stone-50 px-4 py-3 text-sm text-stone-600">{message}</p> : null}
    </div>
  );
}
