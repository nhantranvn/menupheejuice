"use client";

import { useState, useTransition } from "react";
import { Trash2 } from "lucide-react";
import { deleteMenuItemAction } from "@/lib/actions/menu-items";

type Props = {
  menuItemId: string;
  menuItemName: string;
};

export function MenuItemDangerActions({ menuItemId, menuItemName }: Props) {
  const [message, setMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  return (
    <div className="space-y-3">
      <button
        type="button"
        disabled={isPending}
        className="inline-flex h-12 w-full items-center justify-center rounded-full border border-red-200 bg-red-50 px-4 text-sm font-semibold text-red-700 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60"
        onClick={() => {
          const accepted = window.confirm(`Bạn có chắc muốn xóa món ${menuItemName}? Hành động này không thể hoàn tác.`);

          if (!accepted) {
            return;
          }

          setMessage(null);
          startTransition(async () => {
            const result = await deleteMenuItemAction({ menuItemId });
            setMessage(result.ok ? result.message ?? "Đã xóa món." : result.error ?? "Không thể xóa món lúc này.");
          });
        }}
      >
        <Trash2 className="mr-2 h-4 w-4" />
        {isPending ? "Đang xóa..." : "Xóa món"}
      </button>

      {message ? <p className="rounded-2xl bg-stone-50 px-4 py-3 text-sm text-stone-600">{message}</p> : null}
    </div>
  );
}
