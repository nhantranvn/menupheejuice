import type { OrderStatus } from "@prisma/client";
import { OrderStatusForm } from "@/components/admin/order-status-form";
import { OrderSummaryCard } from "@/components/orders/order-summary-card";

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
    user: {
      name: string | null;
      email: string | null;
    };
    items: Array<{
      quantity: number;
      unitPrice: number;
      variantName: string;
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
};

export function OrderCard({ order }: Props) {
  return (
    <OrderSummaryCard
      order={order}
      customer={order.user}
      actionSlot={
        <>
          <p className="mb-3 text-sm font-medium text-stone-600">Cập nhật trạng thái</p>
          <OrderStatusForm orderId={order.id} currentStatus={order.status} />
        </>
      }
    />
  );
}