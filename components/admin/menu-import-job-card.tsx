"use client";

import type { MenuImportStatus } from "@prisma/client";
import { useState, useTransition } from "react";
import { importMenuFromJobAction, saveMenuImportReviewAction } from "@/lib/actions/menu-import";
import { StatusBadge } from "@/components/admin/status-badge";
import { formatDateTime } from "@/lib/utils";

type Props = {
  job: {
    id: string;
    originalFileName: string;
    storedFilePath: string;
    mimeType: string;
    sizeBytes: number;
    status: MenuImportStatus;
    extractedText: string | null;
    errorMessage: string | null;
    createdAt: Date;
    user: {
      name: string | null;
      email: string | null;
    };
  };
};

export function MenuImportJobCard({ job }: Props) {
  const [text, setText] = useState(job.extractedText ?? "");
  const [categoryName, setCategoryName] = useState("Món từ ảnh menu");
  const [message, setMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  return (
    <article className="rounded-3xl border border-stone-200 bg-white p-5">
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <h3 className="text-xl font-semibold">{job.originalFileName}</h3>
          <StatusBadge status={job.status} />
        </div>
        <p className="text-sm text-stone-500">
          Tải bởi {job.user.name ?? job.user.email} lúc {formatDateTime(job.createdAt)}
        </p>
        <div className="grid gap-2 text-sm text-stone-600 sm:grid-cols-3">
          <p>Đường dẫn lưu: {job.storedFilePath}</p>
          <p>Dung lượng: {Math.ceil(job.sizeBytes / 1024)} KB</p>
          <p>Định dạng: {job.mimeType}</p>
        </div>

        <div>
          <label htmlFor={`ocr-text-${job.id}`} className="text-sm font-medium text-stone-700">
            Nội dung OCR để xác nhận
          </label>
          <textarea
            id={`ocr-text-${job.id}`}
            rows={8}
            className="input-field mt-2 resize-y"
            value={text}
            onChange={(event) => setText(event.target.value)}
            placeholder="Sau khi OCR xong, nội dung sẽ hiện ở đây. Bạn có thể sửa lại trước khi nhập vào thực đơn."
          />
          <p className="mt-2 text-xs text-stone-500">
            Gợi ý để import tốt hơn: mỗi dòng nên có dạng `Tên món 45000` hoặc `Tên món - 45.000đ`.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-[1fr_auto_auto] lg:items-end">
          <div>
            <label htmlFor={`category-${job.id}`} className="text-sm font-medium text-stone-700">
              Danh mục khi nhập vào menu
            </label>
            <input
              id={`category-${job.id}`}
              className="input-field mt-2"
              value={categoryName}
              onChange={(event) => setCategoryName(event.target.value)}
              placeholder="Ví dụ: Món từ menu mới"
            />
          </div>
          <button
            type="button"
            className="button-secondary"
            disabled={isPending}
            onClick={() =>
              startTransition(async () => {
                const result = await saveMenuImportReviewAction({ jobId: job.id, extractedText: text });
                setMessage(result.ok ? "Đã lưu nội dung OCR đã chỉnh sửa." : result.error ?? "Không thể lưu nội dung OCR.");
              })
            }
          >
            {isPending ? "Đang lưu..." : "Lưu nội dung OCR"}
          </button>
          <button
            type="button"
            className="button-primary"
            disabled={isPending}
            onClick={() =>
              startTransition(async () => {
                const result = await importMenuFromJobAction({ jobId: job.id, categoryName });

                if (!result.ok) {
                  setMessage(result.error ?? "Không thể nhập menu lúc này.");
                  return;
                }

                const successResult = result as { importedCount: number; categoryName: string };
                setMessage(`Đã nhập ${successResult.importedCount} món vào danh mục ${successResult.categoryName}. Hãy tải lại trang thực đơn để xem cập nhật.`);
              })
            }
          >
            {isPending ? "Đang xử lý..." : "Nhập vào thực đơn"}
          </button>
        </div>

        {job.errorMessage ? <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-600">{job.errorMessage}</p> : null}
        {message ? <p className="rounded-2xl bg-stone-50 px-4 py-3 text-sm text-stone-600">{message}</p> : null}
      </div>
    </article>
  );
}
