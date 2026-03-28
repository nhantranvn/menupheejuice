import type { MenuImportStatus, OrderStatus } from "@prisma/client";
import { cn } from "@/lib/utils";

const orderBadgeClasses: Record<OrderStatus, string> = {
  NEW: "bg-blue-50 text-blue-700",
  PREPARING: "bg-amber-50 text-amber-700",
  COMPLETED: "bg-emerald-50 text-emerald-700",
  CANCELLED: "bg-red-50 text-red-700",
};

const orderLabels: Record<OrderStatus, string> = {
  NEW: "Mới",
  PREPARING: "Đang chuẩn bị",
  COMPLETED: "Hoàn tất",
  CANCELLED: "Đã hủy",
};

const importBadgeClasses: Record<MenuImportStatus, string> = {
  UPLOADED: "bg-sky-50 text-sky-700",
  OCR_PENDING: "bg-indigo-50 text-indigo-700",
  READY_FOR_REVIEW: "bg-amber-50 text-amber-700",
  IMPORTED: "bg-emerald-50 text-emerald-700",
  FAILED: "bg-red-50 text-red-700",
};

const importLabels: Record<MenuImportStatus, string> = {
  UPLOADED: "Đã tải lên",
  OCR_PENDING: "Đang quét OCR",
  READY_FOR_REVIEW: "Chờ xác nhận",
  IMPORTED: "Đã nhập menu",
  FAILED: "Thất bại",
};

export function StatusBadge({ status }: { status: OrderStatus | MenuImportStatus }) {
  const isOrderStatus = status in orderBadgeClasses;
  const classes = isOrderStatus ? orderBadgeClasses[status as OrderStatus] : importBadgeClasses[status as MenuImportStatus];
  const label = isOrderStatus ? orderLabels[status as OrderStatus] : importLabels[status as MenuImportStatus];

  return <span className={cn("inline-flex rounded-full px-3 py-1 text-xs font-semibold", classes)}>{label}</span>;
}
