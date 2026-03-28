"use client";

import { useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { UploadCloud } from "lucide-react";
import { createMenuImportJobAction } from "@/lib/actions/menu-import";

export function MenuImportUploadForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();
  const [message, setMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  return (
    <form
      ref={formRef}
      className="surface p-6 sm:p-8"
      onSubmit={(event) => {
        event.preventDefault();
        setMessage(null);

        const formData = new FormData(event.currentTarget);

        startTransition(async () => {
          const result = await createMenuImportJobAction(formData);

          if (!result.ok) {
            setMessage(result.error ?? "Không thể tạo phiên quét menu lúc này.");
            return;
          }

          setMessage(
            `Đã tạo phiên quét ${result.jobId?.slice(0, 8).toUpperCase()}. Hệ thống đang xử lý OCR ở nền, danh sách bên phải sẽ tự cập nhật khi có kết quả.`,
          );
          formRef.current?.reset();
          router.refresh();
        });
      }}
    >
      <p className="text-sm uppercase tracking-[0.2em] text-orange-600">Tải ảnh menu</p>
      <h2 className="mt-2 text-2xl font-bold">Quét ảnh menu bằng OCR</h2>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-stone-500">
        Bạn có thể tải ảnh menu lên, hệ thống sẽ quét tiếng Việt và tiếng Anh, trả về nội dung chữ để rà soát,
        sau đó nhập các dòng hợp lệ vào danh sách thực đơn.
      </p>

      <label htmlFor="menuImage" className="mt-6 block text-sm font-medium text-stone-700">
        Chọn ảnh menu
      </label>
      <input
        id="menuImage"
        name="menuImage"
        type="file"
        accept="image/png,image/jpeg,image/webp"
        className="input-field mt-2 cursor-pointer file:mr-4 file:rounded-full file:border-0 file:bg-orange-50 file:px-4 file:py-2 file:font-medium file:text-orange-700"
        required
      />
      <p className="mt-2 text-xs text-stone-500">Nên dùng ảnh rõ, thẳng, không bị mờ để OCR cho kết quả tốt hơn.</p>

      <button type="submit" className="button-primary mt-6" disabled={isPending}>
        <UploadCloud className="mr-2 h-4 w-4" />
        {isPending ? "Đang tạo phiên quét..." : "Tải lên và quét menu"}
      </button>

      {message ? <p className="mt-4 rounded-2xl bg-stone-50 px-4 py-3 text-sm text-stone-600">{message}</p> : null}
    </form>
  );
}
