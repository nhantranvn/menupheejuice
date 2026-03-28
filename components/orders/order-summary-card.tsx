import { StatusBadge } from "@/components/admin/status-badge";
import { formatCurrency, formatDateTime } from "@/lib/utils";
import type { OrderStatus } from "@prisma/client";

type Props = {
  order: {
    id: string;
    orderCode: number;
    customerName: string;
    phoneNumber: string;
    deliveryAddress: string;
    note: string | null;
    totalAmount: number;
    status: OrderStatus;
    createdAt: Date;
    items: Array<{
      quantity: number;
      unitPrice: number;
      variantName: string;
      note: string | null;
      menuItem: {
        name: string;
      };
      toppings: Array<{
        name: string;
        price: number;
        quantity: number;
        lineTotal: number;
      }>;
    }>;
  };
  title?: string;
  customer?: {
    name: string | null;
    email: string | null;
  };
  actionSlot?: React.ReactNode;
};

export function OrderSummaryCard({ order, title, customer, actionSlot }: Props) {
  return (
    <article className="surface p-6">
      <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="text-2xl font-bold">{title ?? `Đơn #${order.orderCode}`}</h2>
            <StatusBadge status={order.status} />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-sm text-stone-500">Người nhận hàng</p>
              <p className="mt-1 font-semibold">{order.customerName}</p>
              <p className="text-sm text-stone-500">{order.phoneNumber}</p>
            </div>
            <div>
              <p className="text-sm text-stone-500">Thời gian tạo</p>
              <p className="mt-1 font-semibold">{formatDateTime(order.createdAt)}</p>
            </div>
          </div>
          {customer ? (
            <div>
              <p className="text-sm text-stone-500">Tài khoản đặt món</p>
              <p className="mt-1 font-semibold">{customer.name ?? "Khách Google"}</p>
              <p className="text-sm text-stone-500">{customer.email}</p>
            </div>
          ) : null}
          <div>
            <p className="text-sm text-stone-500">Địa chỉ nhận hàng</p>
            <p className="mt-1 rounded-2xl bg-stone-50 px-4 py-3 text-sm text-stone-600">{order.deliveryAddress}</p>
          </div>
          <div>
            <p className="text-sm text-stone-500">Danh sách món</p>
            <div className="mt-3 space-y-2">
              {order.items.map((item, index) => (
                <div key={`${order.id}-${index}`} className="rounded-2xl bg-stone-50 px-4 py-3 text-sm">
                  <div className="flex items-center justify-between gap-4">
                    <span>
                      {item.menuItem.name} • {item.variantName} x {item.quantity}
                    </span>
                    <span className="font-medium">{formatCurrency(item.quantity * item.unitPrice)}</span>
                  </div>
                  {item.toppings.length > 0 ? (
                    <p className="mt-2 text-xs text-stone-500">
                      Topping: {item.toppings.map((topping) => `${topping.name} x${topping.quantity} (+${formatCurrency(topping.lineTotal)})`).join(", ")}
                    </p>
                  ) : null}
                  {item.note ? <p className="mt-2 text-xs text-stone-500">Ghi chú món: {item.note}</p> : null}
                </div>
              ))}
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-sm text-stone-500">Ghi chú</p>
              <p className="mt-1 rounded-2xl bg-stone-50 px-4 py-3 text-sm text-stone-600">{order.note || "Không có ghi chú cho đơn này."}</p>
            </div>
            <div>
              <p className="text-sm text-stone-500">Tổng tiền</p>
              <p className="mt-1 text-2xl font-bold text-orange-600">{formatCurrency(order.totalAmount)}</p>
            </div>
          </div>
        </div>

        {actionSlot ? <div className="w-full xl:max-w-64">{actionSlot}</div> : null}
      </div>
    </article>
  );
}
