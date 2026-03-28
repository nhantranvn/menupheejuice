"use client";

import { useRef, useState, useTransition } from "react";
import { ImagePlus } from "lucide-react";
import { updateMenuItemImageAction } from "@/lib/actions/menu-items";

type Props = {
  menuItemId: string;
};

export function MenuItemImageForm({ menuItemId }: Props) {
  const formRef = useRef<HTMLFormElement>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  return (
    <form
      ref={formRef}
      className="space-y-3"
      onSubmit={(event) => {
        event.preventDefault();
        setMessage(null);

        const formData = new FormData(event.currentTarget);

        startTransition(async () => {
          const result = await updateMenuItemImageAction(formData);
          setMessage(result.ok ? result.message ?? "Đã cập nhật ảnh món." : result.error ?? "Không thể cập nhật ảnh món.");

          if (result.ok) {
            formRef.current?.reset();
          }
        });
      }}
    >
      <input type="hidden" name="menuItemId" value={menuItemId} />
      <input
        name="image"
        type="file"
        accept="image/png,image/jpeg,image/webp"
        className="input-field h-14 cursor-pointer text-sm file:mr-4 file:rounded-full file:border-0 file:bg-orange-50 file:px-4 file:py-2 file:font-medium file:text-orange-700"
        required
      />
      <button type="submit" className="button-secondary h-12 w-full px-4 text-sm" disabled={isPending}>
        <ImagePlus className="mr-2 h-4 w-4" />
        {isPending ? "Đang tải ảnh..." : "Cập nhật ảnh món"}
      </button>
      {message ? <p className="rounded-2xl bg-stone-50 px-4 py-3 text-sm text-stone-600">{message}</p> : null}
    </form>
  );
}
