"use client";

import type { OrderStatus } from "@prisma/client";
import { useState, useTransition } from "react";
import { updateOrderStatusAction } from "@/lib/actions/admin";

const statuses: Array<{ value: OrderStatus; label: string }> = [
  { value: "NEW", label: "Mới" },
  { value: "PREPARING", label: "Đang chuẩn bị" },
  { value: "COMPLETED", label: "Hoàn tất" },
  { value: "CANCELLED", label: "Đã hủy" },
];

export function OrderStatusForm({ orderId, currentStatus }: { orderId: string; currentStatus: OrderStatus }) {
  const [status, setStatus] = useState<OrderStatus>(currentStatus);
  const [message, setMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  return (
    <div className="space-y-3">
      <select
        className="input-field"
        value={status}
        onChange={(event) => setStatus(event.target.value as OrderStatus)}
        disabled={isPending}
      >
        {statuses.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <button
        type="button"
        className="button-secondary w-full"
        disabled={isPending}
        onClick={() =>
          startTransition(async () => {
            const result = await updateOrderStatusAction({ orderId, status });
            setMessage(result.ok ? "Đã cập nhật trạng thái." : result.error ?? "Không thể cập nhật trạng thái.");
          })
        }
      >
        {isPending ? "Đang cập nhật..." : "Lưu trạng thái"}
      </button>
      {message ? <p className="text-sm text-stone-500">{message}</p> : null}
    </div>
  );
}