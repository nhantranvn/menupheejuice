"use client";

import { useRef, useState, useTransition } from "react";
import { PlusCircle } from "lucide-react";
import { upsertToppingAction } from "@/lib/actions/toppings";

export function ManualToppingForm() {
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
          const result = await upsertToppingAction(formData);
          setMessage(result.ok ? result.message ?? "Đã lưu topping." : result.error ?? "Không thể lưu topping lúc này.");

          if (result.ok) {
            formRef.current?.reset();
          }
        });
      }}
    >
      <p className="text-sm uppercase tracking-[0.2em] text-orange-600">Thêm topping thủ công</p>
      <h2 className="mt-2 text-2xl font-bold">Thêm topping mới vào menu</h2>
      <p className="mt-3 max-w-3xl text-stone-600">
        Dùng form này để thêm các loại topping mới như trân châu, thạch, hạt sen...
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="name" className="text-sm font-medium text-stone-700">
            Tên topping
          </label>
          <input 
            id="name" 
            name="name" 
            type="text" 
            className="input-field mt-2" 
            placeholder="Ví dụ: Trân châu trắng" 
            required 
          />
        </div>

        <div>
          <label htmlFor="price" className="text-sm font-medium text-stone-700">
            Giá bán (VNĐ)
          </label>
          <input
            id="price"
            name="price"
            type="number"
            className="input-field mt-2"
            placeholder="Ví dụ: 5000"
            required
            min="0"
          />
        </div>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="sortOrder" className="text-sm font-medium text-stone-700">
            Thứ tự hiển thị
          </label>
          <input
            id="sortOrder"
            name="sortOrder"
            type="number"
            className="input-field mt-2"
            defaultValue="0"
          />
          <p className="mt-2 text-sm text-stone-500">Số càng nhỏ sẽ hiển thị càng đầu danh sách.</p>
        </div>

        <div className="flex items-end pb-2">
          <label className="inline-flex items-center gap-3 text-sm font-medium text-stone-700">
            <input 
              name="isActive" 
              type="checkbox" 
              className="h-4 w-4 rounded border-stone-300 text-orange-600" 
              defaultChecked 
            />
            Đang phục vụ (hiển thị cho khách)
          </label>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <button type="submit" className="button-primary" disabled={isPending}>
          <PlusCircle className="mr-2 h-4 w-4" />
          {isPending ? "Đang thêm..." : "Thêm topping vào menu"}
        </button>
      </div>

      {message ? (
        <p className={`mt-4 rounded-2xl px-4 py-3 text-sm ${message.includes("lỗi") || message.includes("Không") ? "bg-red-50 text-red-600" : "bg-emerald-50 text-emerald-600"}`}>
          {message}
        </p>
      ) : null}
    </form>
  );
}
