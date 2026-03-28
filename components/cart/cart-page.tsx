"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useState, useTransition } from "react";
import { createOrderAction } from "@/lib/actions/order";
import { useCart } from "@/components/cart/cart-provider";
import { resolveMenuItemImageUrl } from "@/lib/menu-item-images";
import { formatCurrency } from "@/lib/utils";

export function CartPage() {
  const router = useRouter();
  const { items, totalAmount, updateQuantity, updateItemNote, removeItem, clearCart } = useCart();
  const [customerName, setCustomerName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [note, setNote] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const isEmpty = items.length === 0;

  return (
    <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
      <section className="surface p-6 sm:p-8">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-orange-600">Giỏ hàng</p>
            <h1 className="mt-2 text-3xl font-bold">Tóm tắt đơn hàng</h1>
          </div>
          <div className="flex items-center gap-3">
            {!isEmpty ? (
              <button type="button" className="button-secondary px-4 py-2 text-sm" onClick={clearCart}>
                Xóa tất cả
              </button>
            ) : null}
            <Link href="/menu" className="text-sm font-semibold text-blue-600 transition hover:text-blue-700">
              Thêm món
            </Link>
          </div>
        </div>

        {isEmpty ? (
          <div className="mt-8 rounded-3xl border border-dashed border-stone-300 bg-stone-50 p-8 text-center">
            <p className="text-lg font-semibold">Giỏ hàng đang trống</p>
            <p className="mt-2 text-stone-500">Thêm món ở trang thực đơn để bắt đầu tạo đơn.</p>
            <Link href="/menu" className="button-primary mt-5">
              Xem thực đơn
            </Link>
          </div>
        ) : (
          <div className="mt-8 space-y-4">
            {items.map((item) => {
              const resolvedImageUrl = resolveMenuItemImageUrl(item.imageUrl);

              return (
                <div key={item.cartItemId} className="rounded-[2rem] border border-stone-200 bg-white p-4 shadow-[0_18px_40px_-28px_rgba(28,25,23,0.28)] sm:p-5">
                  <div className="flex gap-4">
                    <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-[1.5rem] bg-stone-100 sm:h-28 sm:w-28">
                      {resolvedImageUrl ? (
                        <img src={resolvedImageUrl} alt={item.name} className="h-full w-full object-cover object-center" />
                      ) : (
                        <div className="px-3 text-center text-sm font-medium text-stone-500">{item.name}</div>
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                          <p className="text-xl font-semibold leading-tight text-stone-950 sm:text-2xl">{item.name}</p>
                          <p className="mt-1 text-sm text-stone-500">
                            {item.variantName} • {formatCurrency(item.basePrice)}
                          </p>
                          {item.toppings.length > 0 ? (
                            <p className="mt-2 text-sm leading-6 text-stone-500">
                              Topping: {item.toppings.map((topping) => `${topping.name} x${topping.quantity} (+${formatCurrency(topping.lineTotal)})`).join(", ")}
                            </p>
                          ) : (
                            <p className="mt-2 text-sm text-stone-400">Không thêm topping</p>
                          )}
                          {item.note ? <p className="mt-2 text-sm font-medium text-stone-700">Lưu ý: {item.note}</p> : null}
                          <Link href="/menu" className="mt-3 inline-flex text-sm font-semibold text-blue-600 transition hover:text-blue-700">
                            Chỉnh sửa
                          </Link>
                        </div>

                        <div className="shrink-0 text-right">
                          <p className="text-lg font-semibold text-stone-950 sm:text-xl">{formatCurrency(item.totalPrice * item.quantity)}</p>
                          <span className="mt-3 inline-flex h-12 min-w-12 items-center justify-center rounded-full border-2 border-emerald-500 bg-white px-3 text-lg font-semibold text-emerald-700">
                            {item.quantity}
                          </span>
                        </div>
                      </div>

                      <div className="mt-4 grid gap-3 xl:grid-cols-[minmax(0,1fr)_auto] xl:items-end">
                        <div>
                          <label htmlFor={`note-${item.cartItemId}`} className="text-sm font-medium text-stone-700">
                            Lưu ý cho quán ở món này
                          </label>
                          <textarea
                            id={`note-${item.cartItemId}`}
                            rows={2}
                            className="input-field mt-2 resize-none"
                            placeholder="Ví dụ: ít đá, ít ngọt, tách riêng topping..."
                            value={item.note}
                            onChange={(event) => updateItemNote(item.cartItemId, event.target.value)}
                          />
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="flex items-center rounded-full border border-stone-200 bg-stone-50 p-1">
                            <button
                              type="button"
                              className="flex h-10 w-10 items-center justify-center rounded-full text-stone-600 transition hover:bg-white"
                              onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="w-10 text-center text-sm font-semibold">{item.quantity}</span>
                            <button
                              type="button"
                              className="flex h-10 w-10 items-center justify-center rounded-full text-stone-600 transition hover:bg-white"
                              onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>
                          <button
                            type="button"
                            className="flex h-11 w-11 items-center justify-center rounded-full border border-stone-200 text-stone-500 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                            onClick={() => removeItem(item.cartItemId)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      <aside className="surface h-fit p-6 sm:p-8">
        <p className="text-sm uppercase tracking-[0.2em] text-orange-600">Xác nhận đơn</p>
        <h2 className="mt-2 text-2xl font-bold">Thông tin đặt món</h2>
        <p className="mt-3 text-sm leading-6 text-stone-500">Khách có thể đặt trực tiếp không cần đăng nhập. Quán sẽ liên hệ theo số điện thoại bạn nhập bên dưới.</p>

        <div className="mt-6 rounded-3xl bg-stone-50 p-5">
          <div className="flex items-center justify-between text-sm text-stone-500">
            <span>Tổng món</span>
            <span>{items.reduce((sum, item) => sum + item.quantity, 0)}</span>
          </div>
          <div className="mt-3 flex items-center justify-between border-t border-dashed border-stone-200 pt-3">
            <span className="font-medium text-stone-600">Tổng thanh toán</span>
            <span className="text-xl font-semibold text-orange-600">{formatCurrency(totalAmount)}</span>
          </div>
        </div>

        <label htmlFor="customerName" className="mt-6 block text-sm font-medium text-stone-700">
          Tên người nhận
        </label>
        <input
          id="customerName"
          className="input-field mt-2"
          placeholder="Ví dụ: Trần Nhân"
          value={customerName}
          onChange={(event) => setCustomerName(event.target.value)}
        />

        <label htmlFor="phoneNumber" className="mt-4 block text-sm font-medium text-stone-700">
          Số điện thoại
        </label>
        <input
          id="phoneNumber"
          className="input-field mt-2"
          placeholder="Ví dụ: 09xxxxxxxx"
          value={phoneNumber}
          onChange={(event) => setPhoneNumber(event.target.value)}
        />

        <label htmlFor="deliveryAddress" className="mt-4 block text-sm font-medium text-stone-700">
          Địa chỉ nhận hàng
        </label>
        <textarea
          id="deliveryAddress"
          rows={3}
          className="input-field mt-2 resize-none"
          placeholder="Ví dụ: Số 12, ngõ 34, Hoàng Quốc Việt, Cầu Giấy, Hà Nội"
          value={deliveryAddress}
          onChange={(event) => setDeliveryAddress(event.target.value)}
        />

        <label htmlFor="note" className="mt-4 block text-sm font-medium text-stone-700">
          Ghi chú đơn hàng
        </label>
        <textarea
          id="note"
          rows={5}
          className="input-field mt-2 resize-none"
          placeholder="Ví dụ: Ít đá, ít ngọt, giao nhanh trước 12h..."
          value={note}
          onChange={(event) => setNote(event.target.value)}
        />

        {error ? <p className="mt-4 rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p> : null}

        <button
          type="button"
          className="button-primary mt-6 w-full"
          disabled={isEmpty || isPending}
          onClick={() => {
            setError(null);
            startTransition(async () => {
              const result = await createOrderAction({
                customerName,
                phoneNumber,
                deliveryAddress,
                note,
                items: items.map((item) => ({
                  menuItemId: item.menuItemId,
                  variantId: item.variantId,
                  note: item.note,
                  toppings: item.toppings.map((topping) => ({
                    toppingId: topping.id,
                    quantity: topping.quantity,
                  })),
                  quantity: item.quantity,
                })),
              });

              if (!result.ok) {
                setError(result.error ?? "Không thể tạo đơn hàng lúc này. Vui lòng thử lại.");
                return;
              }

              clearCart();
              setCustomerName("");
              setPhoneNumber("");
              setDeliveryAddress("");
              setNote("");
              router.push(`/orders/success?orderCode=${result.orderCode}`);
              router.refresh();
            });
          }}
        >
          {isPending ? "Đang tạo đơn..." : "Đặt món ngay"}
        </button>
      </aside>
    </div>
  );
}
