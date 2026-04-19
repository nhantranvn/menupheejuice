"use client";

import { useState, useTransition } from "react";
import { Trash2, Edit2 } from "lucide-react";
import { deleteToppingAction, upsertToppingAction } from "@/lib/actions/toppings";

type Props = {
  topping: {
    id: string;
    name: string;
    price: number;
    sortOrder: number;
    isActive: boolean;
  };
};

export function ToppingActions({ topping }: Props) {
  const [message, setMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [isEditing, setIsEditing] = useState(false);

  if (isEditing) {
    return (
      <form
        className="space-y-3 rounded-3xl border border-stone-200 bg-stone-50 p-4"
        onSubmit={(event) => {
          event.preventDefault();
          setMessage(null);
          const formData = new FormData(event.currentTarget);
          startTransition(async () => {
            const result = await upsertToppingAction(formData);
            if (result.ok) {
              setIsEditing(false);
            }
            setMessage(result.ok ? result.message ?? "Đã lưu." : result.error ?? "Lỗi.");
          });
        }}
      >
        <input type="hidden" name="id" value={topping.id} />
        <div>
          <label className="text-xs font-medium text-stone-500">Tên topping</label>
          <input name="name" defaultValue={topping.name} className="input-field mt-1 h-9 text-sm" required />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-xs font-medium text-stone-500">Giá</label>
            <input name="price" type="number" defaultValue={topping.price} className="input-field mt-1 h-9 text-sm" required />
          </div>
          <div>
            <label className="text-xs font-medium text-stone-500">Thứ tự</label>
            <input name="sortOrder" type="number" defaultValue={topping.sortOrder} className="input-field mt-1 h-9 text-sm" />
          </div>
        </div>
        <label className="flex items-center gap-2 text-xs font-medium text-stone-600">
          <input name="isActive" type="checkbox" defaultChecked={topping.isActive} className="h-3 w-3" />
          Đang phục vụ
        </label>
        <div className="flex gap-2">
          <button type="submit" disabled={isPending} className="button-primary h-9 flex-1 text-xs">
            Lưu
          </button>
          <button type="button" onClick={() => setIsEditing(false)} className="button-secondary h-9 flex-1 text-xs">
            Hủy
          </button>
        </div>
        {message ? <p className="text-xs text-stone-600">{message}</p> : null}
      </form>
    );
  }

  return (
    <div className="space-y-3">
      <button
        type="button"
        className="inline-flex h-12 w-full items-center justify-center rounded-full border border-stone-200 bg-white px-4 text-sm font-semibold text-stone-700 transition hover:bg-stone-50"
        onClick={() => setIsEditing(true)}
      >
        <Edit2 className="mr-2 h-4 w-4" />
        Sửa thông tin
      </button>

      <button
        type="button"
        disabled={isPending}
        className="inline-flex h-12 w-full items-center justify-center rounded-full border border-red-200 bg-red-50 px-4 text-sm font-semibold text-red-700 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60"
        onClick={() => {
          const accepted = window.confirm(`Bạn có chắc muốn xóa topping ${topping.name}?`);
          if (!accepted) return;
          setMessage(null);
          startTransition(async () => {
            const result = await deleteToppingAction({ toppingId: topping.id });
            setMessage(result.ok ? result.message ?? "Đã xóa." : result.error ?? "Lỗi.");
          });
        }}
      >
        <Trash2 className="mr-2 h-4 w-4" />
        {isPending ? "Đang xóa..." : "Xóa topping"}
      </button>

      {message ? <p className="rounded-2xl bg-stone-50 px-4 py-3 text-sm text-stone-600">{message}</p> : null}
    </div>
  );
}
