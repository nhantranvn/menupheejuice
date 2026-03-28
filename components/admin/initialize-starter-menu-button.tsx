"use client";

import { useState, useTransition } from "react";
import { RefreshCcw } from "lucide-react";
import { initializeStarterMenuAction } from "@/lib/actions/menu-items";

type Props = {
  currentCount: number;
  targetCount: number;
  currentImageCount: number;
  targetImageCount: number;
};

export function InitializeStarterMenuButton({ currentCount, targetCount, currentImageCount, targetImageCount }: Props) {
  const [message, setMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const missingCount = Math.max(targetCount - currentCount, 0);
  const missingImages = Math.max(targetImageCount - currentImageCount, 0);

  return (
    <section className="surface p-6 sm:p-8">
      <p className="text-sm uppercase tracking-[0.2em] text-orange-600">Đồng bộ menu gốc</p>
      <h2 className="mt-2 text-2xl font-bold">
        Production đang có {currentCount}/{targetCount} món và {currentImageCount}/{targetImageCount} ảnh thật
      </h2>
      <p className="mt-3 max-w-3xl text-stone-600">
        Nút này sẽ bổ sung các món còn thiếu từ menu gốc, cập nhật lại danh mục, size và đồng bộ thêm ảnh có sẵn.
        Ảnh bạn đã tải thủ công sẽ được giữ nguyên, hệ thống chỉ ưu tiên ảnh tốt hơn khi món đang dùng placeholder.
      </p>
      <div className="mt-6 flex flex-wrap items-center gap-3">
        <button
          type="button"
          className="button-primary"
          disabled={isPending}
          onClick={() => {
            setMessage(null);
            startTransition(async () => {
              const result = await initializeStarterMenuAction();
              setMessage(
                result.ok
                  ? result.message ?? "Đã đồng bộ menu gốc."
                  : result.error ?? "Không thể đồng bộ menu lúc này.",
              );
            });
          }}
        >
          <RefreshCcw className="mr-2 h-4 w-4" />
          {isPending
            ? "Đang đồng bộ..."
            : missingCount > 0
              ? `Đồng bộ thêm ${missingCount} món`
              : `Đồng bộ thêm ${missingImages} ảnh có sẵn`}
        </button>
        <p className="text-sm text-stone-500">Phù hợp khi production còn thiếu món, thiếu ảnh thật hoặc vừa được đồng bộ từ dữ liệu cũ.</p>
      </div>
      {message ? <p className="mt-4 rounded-2xl bg-stone-50 px-4 py-3 text-sm text-stone-600">{message}</p> : null}
    </section>
  );
}
