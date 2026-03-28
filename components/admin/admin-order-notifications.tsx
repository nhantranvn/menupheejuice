"use client";

import { Bell, BellRing, RefreshCw } from "lucide-react";
import { useEffect, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { formatCurrency, formatDateTime } from "@/lib/utils";

type OrderSnapshot = {
  id: string;
  orderCode: number;
  customerName: string;
  totalAmount: number;
  createdAt: string;
};

type Props = {
  initialLatestOrder: OrderSnapshot | null;
  initialNewOrderCount: number;
};

type LatestOrderResponse = {
  latestOrder: OrderSnapshot | null;
  newOrderCount: number;
};

type BrowserNotificationState = NotificationPermission | "unsupported" | "unknown";

function canUseBrowserNotifications() {
  return typeof window !== "undefined" && "Notification" in window;
}

export function AdminOrderNotifications({ initialLatestOrder, initialNewOrderCount }: Props) {
  const router = useRouter();
  const [latestOrder, setLatestOrder] = useState<OrderSnapshot | null>(initialLatestOrder);
  const [newOrderCount, setNewOrderCount] = useState(initialNewOrderCount);
  const [announcement, setAnnouncement] = useState<string | null>(null);
  const [permission, setPermission] = useState<BrowserNotificationState>("unknown");
  const [isRefreshing, startTransition] = useTransition();
  const latestOrderIdRef = useRef<string | null>(initialLatestOrder?.id ?? null);
  const baseTitleRef = useRef("Phee Juice Trần Cung");

  useEffect(() => {
    if (typeof document !== "undefined") {
      baseTitleRef.current = document.title;
    }

    if (!canUseBrowserNotifications()) {
      setPermission("unsupported");
      return;
    }

    setPermission(Notification.permission);
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") {
      return;
    }

    document.title = newOrderCount > 0 ? `(${newOrderCount}) Đơn mới | ${baseTitleRef.current}` : baseTitleRef.current;

    return () => {
      document.title = baseTitleRef.current;
    };
  }, [newOrderCount]);

  useEffect(() => {
    let active = true;
    let isPolling = false;

    const pollLatestOrder = async () => {
      if (!active || isPolling) {
        return;
      }

      isPolling = true;

      try {
        const response = await fetch("/api/admin/orders/latest", {
          cache: "no-store",
        });

        if (!response.ok) {
          return;
        }

        const data = (await response.json()) as LatestOrderResponse;

        if (!active) {
          return;
        }

        setLatestOrder(data.latestOrder);
        setNewOrderCount(data.newOrderCount);

        const currentLatestId = data.latestOrder?.id ?? null;

        if (currentLatestId && currentLatestId !== latestOrderIdRef.current) {
          latestOrderIdRef.current = currentLatestId;

          setAnnouncement(`Có đơn mới #${data.latestOrder.orderCode} từ ${data.latestOrder.customerName}. Danh sách đơn đã được cập nhật.`);

          if (canUseBrowserNotifications() && Notification.permission === "granted") {
            const notification = new Notification(`Đơn mới #${data.latestOrder.orderCode}`, {
              body: `${data.latestOrder.customerName} vừa đặt ${formatCurrency(data.latestOrder.totalAmount)} lúc ${formatDateTime(data.latestOrder.createdAt)}.`,
              tag: `order-${data.latestOrder.id}`,
            });

            notification.onclick = () => {
              window.focus();
            };
          }

          startTransition(() => {
            router.refresh();
          });
        }

        if (!currentLatestId) {
          latestOrderIdRef.current = null;
        }
      } finally {
        isPolling = false;
      }
    };

    pollLatestOrder();
    const intervalId = window.setInterval(pollLatestOrder, 15000);

    return () => {
      active = false;
      window.clearInterval(intervalId);
    };
  }, [router]);

  const requestNotificationPermission = async () => {
    if (!canUseBrowserNotifications()) {
      setPermission("unsupported");
      return;
    }

    const result = await Notification.requestPermission();
    setPermission(result);
  };

  return (
    <section className="surface p-5 sm:p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-orange-600">Thông báo đơn mới</p>
          <h2 className="mt-2 text-2xl font-bold">Theo dõi đơn hàng theo thời gian gần thực</h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-stone-500">
            Trang này tự kiểm tra đơn mới mỗi 15 giây. Khi có khách đặt thành công, danh sách sẽ tự làm mới và có thể bật thông báo trên trình duyệt.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <div className="rounded-3xl bg-stone-50 px-5 py-4">
            <p className="text-sm text-stone-500">Đơn mới chờ xử lý</p>
            <p className="text-2xl font-bold text-orange-600">{newOrderCount}</p>
          </div>

          <button
            type="button"
            className="button-secondary gap-2"
            onClick={() =>
              startTransition(() => {
                router.refresh();
              })
            }
            disabled={isRefreshing}
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
            {isRefreshing ? "Đang làm mới..." : "Làm mới ngay"}
          </button>

          {permission === "default" ? (
            <button type="button" className="button-primary gap-2" onClick={requestNotificationPermission}>
              <BellRing className="h-4 w-4" />
              Bật thông báo trình duyệt
            </button>
          ) : permission === "unknown" ? (
            <div className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white px-4 py-3 text-sm font-medium text-stone-500">
              <Bell className="h-4 w-4" />
              Đang kiểm tra thông báo trình duyệt
            </div>
          ) : (
            <div className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white px-4 py-3 text-sm font-medium text-stone-600">
              {permission === "granted" ? <BellRing className="h-4 w-4 text-emerald-600" /> : <Bell className="h-4 w-4 text-stone-400" />}
              {permission === "granted"
                ? "Thông báo trình duyệt đã bật"
                : permission === "denied"
                  ? "Trình duyệt đang chặn thông báo"
                  : "Thiết bị này không hỗ trợ thông báo"}
            </div>
          )}
        </div>
      </div>

      {announcement ? (
        <div className="mt-4 rounded-3xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm text-emerald-800">
          {announcement}
        </div>
      ) : null}

      {latestOrder ? (
        <div className="mt-4 rounded-3xl bg-stone-50 px-5 py-4 text-sm text-stone-600">
          <span className="font-semibold text-stone-900">Đơn gần nhất:</span> #{latestOrder.orderCode} • {latestOrder.customerName} • {formatCurrency(latestOrder.totalAmount)} • {formatDateTime(latestOrder.createdAt)}
        </div>
      ) : null}
    </section>
  );
}
