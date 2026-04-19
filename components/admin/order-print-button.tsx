"use client";

import { Printer } from "lucide-react";
import { useState, useTransition } from "react";
import { printOrderById } from "@/lib/order-print-client";

export function OrderPrintButton({ orderId }: { orderId: string }) {
  const [message, setMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  return (
    <div className="space-y-3">
      <button
        type="button"
        className="button-secondary flex w-full items-center justify-center gap-2"
        disabled={isPending}
        onClick={() =>
          startTransition(async () => {
            try {
              await printOrderById(orderId);
              setMessage("Da mo hop thoai in don.");
            } catch (error) {
              setMessage(error instanceof Error ? error.message : "Khong the in don hang luc nay.");
            }
          })
        }
      >
        <Printer className="h-4 w-4" />
        {isPending ? "Dang chuan bi ban in..." : "In don"}
      </button>
      {message ? <p className="text-sm text-stone-500">{message}</p> : null}
    </div>
  );
}
