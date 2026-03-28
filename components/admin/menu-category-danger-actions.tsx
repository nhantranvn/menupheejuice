"use client";

import { useState, useTransition } from "react";
import { Trash2 } from "lucide-react";
import { deleteMenuCategoryAction } from "@/lib/actions/menu-items";

type Props = {
  categoryId: string;
  categoryName: string;
};

export function MenuCategoryDangerActions({ categoryId, categoryName }: Props) {
  const [message, setMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  return (
    <div className="space-y-3">
      <button
        type="button"
        disabled={isPending}
        className="inline-flex h-11 w-full items-center justify-center rounded-full border border-red-200 bg-red-50 px-4 text-sm font-semibold text-red-700 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60"
        onClick={() => {
          const accepted = window.confirm(`Bạn có chắc muốn xóa danh mục ${categoryName}? Chỉ danh mục trống mới xóa được.`);

          if (!accepted) {
            return;
          }

          setMessage(null);
          startTransition(async () => {
            const result = await deleteMenuCategoryAction({ categoryId });
            setMessage(result.ok ? result.message ?? "Đã xóa danh mục." : result.error ?? "Không thể xóa danh mục lúc này.");
          });
        }}
      >
        <Trash2 className="mr-2 h-4 w-4" />
        {isPending ? "Đang xóa..." : "Xóa danh mục trống"}
      </button>

      {message ? <p className="rounded-2xl bg-stone-50 px-4 py-3 text-sm text-stone-600">{message}</p> : null}
    </div>
  );
}
