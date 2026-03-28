"use client";

import { useState, useTransition } from "react";
import { RefreshCcw } from "lucide-react";
import { initializeStarterMenuAction } from "@/lib/actions/menu-items";

type Props = {
  currentCount: number;
  targetCount: number;
};

export function InitializeStarterMenuButton({ currentCount, targetCount }: Props) {
  const [message, setMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const missingCount = Math.max(targetCount - currentCount, 0);

  return (
    <section className="surface p-6 sm:p-8">
      <p className="text-sm uppercase tracking-[0.2em] text-orange-600">Đồng bộ menu gốc</p>
      <h2 className="mt-2 text-2xl font-bold">Production đang có {currentCount}/{targetCount} món</h2>
      <p className="mt-3 max-w-3xl text-stone-600">
        Nút này sẽ bổ sung các món còn thiếu từ menu gốc, cập nhật lại danh mục, size và đường dẫn ảnh mẫu.
        Ảnh bạn đã tải thủ công sẽ được giữ nguyên, hệ thống chỉ ưu tiên ảnh có sẵn tốt hơn khi món đang dùng ảnh placeholder.
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
          {isPending ? "Đang đồng bộ..." : `Đồng bộ thêm ${missingCount} món`}
        </button>
        <p className="text-sm text-stone-500">Phù hợp khi production còn thiếu món so với menu gốc hoặc mới được tạo từ database trống.</p>
      </div>
      {message ? <p className="mt-4 rounded-2xl bg-stone-50 px-4 py-3 text-sm text-stone-600">{message}</p> : null}
    </section>
  );
}
