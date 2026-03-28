"use client";

import { useRef, useState, useTransition } from "react";
import { PlusCircle } from "lucide-react";
import { createManualMenuItemAction } from "@/lib/actions/menu-items";

type Props = {
  categories: Array<{
    id: string;
    name: string;
  }>;
};

export function ManualMenuItemForm({ categories }: Props) {
  const formRef = useRef<HTMLFormElement>(null);
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
          const result = await createManualMenuItemAction(formData);
          setMessage(result.ok ? result.message ?? "Đã thêm món thủ công." : result.error ?? "Không thể thêm món lúc này.");

          if (result.ok) {
            formRef.current?.reset();
          }
        });
      }}
    >
      <p className="text-sm uppercase tracking-[0.2em] text-orange-600">Nhập món thủ công</p>
      <h2 className="mt-2 text-2xl font-bold">Thêm món mới không cần OCR</h2>
      <p className="mt-3 max-w-3xl text-stone-600">
        Dùng form này khi bạn muốn nhập nhanh món mới bằng tay. Hệ thống sẽ tự tạo sẵn 2 size mặc định:
        cốc 500ml giá 30.000đ và cốc 700ml giá 40.000đ.
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="categoryId" className="text-sm font-medium text-stone-700">
            Chọn danh mục có sẵn
          </label>
          <select id="categoryId" name="categoryId" className="input-field mt-2 default:bg-white">
            <option value="">-- Chọn danh mục --</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="newCategoryName" className="text-sm font-medium text-stone-700">
            Hoặc tạo danh mục mới
          </label>
          <input
            id="newCategoryName"
            name="newCategoryName"
            type="text"
            className="input-field mt-2"
            placeholder="Ví dụ: Trà trái cây mùa hè"
          />
        </div>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="name" className="text-sm font-medium text-stone-700">
            Tên món
          </label>
          <input id="name" name="name" type="text" className="input-field mt-2" placeholder="Ví dụ: Trà đào cam sả" required />
        </div>

        <div>
          <label htmlFor="imageUrl" className="text-sm font-medium text-stone-700">
            Link ảnh mẫu (không bắt buộc)
          </label>
          <input
            id="imageUrl"
            name="imageUrl"
            type="url"
            className="input-field mt-2"
            placeholder="https://..."
          />
        </div>
      </div>

      <div className="mt-4">
        <label htmlFor="description" className="text-sm font-medium text-stone-700">
          Mô tả món
        </label>
        <textarea
          id="description"
          name="description"
          rows={4}
          className="input-field mt-2 resize-y"
          placeholder="Nhập mô tả ngắn để hiển thị ngoài menu khách hàng"
        />
      </div>

      <label className="mt-4 inline-flex items-center gap-3 text-sm font-medium text-stone-700">
        <input name="isAvailable" type="checkbox" className="h-4 w-4 rounded border-stone-300 text-orange-600" defaultChecked />
        Hiển thị ngay trong menu khách hàng
      </label>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <button type="submit" className="button-primary" disabled={isPending}>
          <PlusCircle className="mr-2 h-4 w-4" />
          {isPending ? "Đang thêm món..." : "Thêm món thủ công"}
        </button>
        <p className="text-sm text-stone-500">Sau khi thêm xong, bạn có thể kéo xuống bên dưới để cập nhật ảnh thật cho món.</p>
      </div>

      {message ? <p className="mt-4 rounded-2xl bg-stone-50 px-4 py-3 text-sm text-stone-600">{message}</p> : null}
    </form>
  );
}
