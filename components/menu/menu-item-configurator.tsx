"use client";

import { useEffect, useMemo, useState } from "react";
import { Minus, Plus, ShoppingCart, X } from "lucide-react";
import { useCart } from "@/components/cart/cart-provider";
import { MENU_DESCRIPTION_BY_NAME } from "@/lib/menu-descriptions";
import { resolveMenuItemImageUrl } from "@/lib/menu-item-images";
import { formatCurrency } from "@/lib/utils";

type Props = {
  item: {
    id: string;
    name: string;
    description: string | null;
    imageUrl: string | null;
    isAvailable?: boolean;
    variants: Array<{
      id: string;
      name: string;
      sizeMl: number;
      price: number;
    }>;
  };
  toppings: Array<{
    id: string;
    name: string;
    price: number;
  }>;
  trigger?: React.ReactNode;
  disabled?: boolean;
};

function buildCartItemId(menuItemId: string, variantId: string, toppingState: Record<string, number>) {
  const toppingKey = Object.entries(toppingState)
    .filter(([, quantity]) => quantity > 0)
    .sort(([leftId], [rightId]) => leftId.localeCompare(rightId))
    .map(([toppingId, quantity]) => `${toppingId}:${quantity}`)
    .join("-");

  return `${menuItemId}__${variantId}__${toppingKey}`;
}

export function MenuItemConfigurator({ item, toppings, trigger, disabled = false }: Props) {
  const { addItem } = useCart();
  const [selectedVariantId, setSelectedVariantId] = useState(item.variants[0]?.id ?? "");
  const [toppingState, setToppingState] = useState<Record<string, number>>({});
  const [isAdded, setIsAdded] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);

  const selectedVariant = useMemo(
    () => item.variants.find((variant) => variant.id === selectedVariantId) ?? item.variants[0],
    [item.variants, selectedVariantId],
  );

  const baseVariant = item.variants.find((variant) => variant.sizeMl === 500) ?? item.variants[0];
  const upsizedVariant = item.variants.find((variant) => variant.sizeMl === 700) ?? item.variants[item.variants.length - 1];
  const displayDescription = MENU_DESCRIPTION_BY_NAME[item.name] ?? item.description ?? "";
  const resolvedImageUrl = useMemo(() => resolveMenuItemImageUrl(item.imageUrl), [item.imageUrl]);

  const selectedToppings = toppings
    .map((topping) => {
      const quantity = toppingState[topping.id] ?? 0;
      return quantity > 0
        ? {
            ...topping,
            quantity,
            lineTotal: topping.price * quantity,
          }
        : null;
    })
    .filter((value): value is { id: string; name: string; price: number; quantity: number; lineTotal: number } => Boolean(value));

  const totalPrice = (selectedVariant?.price ?? 0) + selectedToppings.reduce((sum, topping) => sum + topping.lineTotal, 0);
  const selectedToppingCount = selectedToppings.reduce((sum, topping) => sum + topping.quantity, 0);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  const addToCart = () => {
    if (!selectedVariant || disabled) {
      return;
    }

    addItem({
      cartItemId: buildCartItemId(item.id, selectedVariant.id, toppingState),
      menuItemId: item.id,
      name: item.name,
      imageUrl: resolvedImageUrl,
      variantId: selectedVariant.id,
      variantName: selectedVariant.name,
      sizeMl: selectedVariant.sizeMl,
      basePrice: selectedVariant.price,
      toppings: selectedToppings,
      totalPrice,
      note: "",
    });

    setIsAdded(true);
    window.setTimeout(() => setIsAdded(false), 1200);
    setIsOpen(false);
  };

  return (
    <>
      <button
        type="button"
        disabled={disabled}
        onClick={() => {
          if (!disabled) {
            setIsOpen(true);
          }
        }}
        className={`${trigger ? "block w-full text-left" : "inline-flex items-center gap-2 rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white"} ${disabled ? "cursor-not-allowed" : ""}`}
      >
        {trigger ?? (
          <>
            <ShoppingCart className="h-4 w-4" />
            Chọn món
          </>
        )}
      </button>

      {isOpen ? (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-stone-950/55 md:items-center">
          <div className="absolute inset-0" onClick={() => setIsOpen(false)} />
          <div className="relative z-10 flex h-[88vh] w-full max-w-2xl flex-col overflow-hidden rounded-t-[2rem] bg-white shadow-2xl md:h-auto md:max-h-[92vh] md:rounded-[2rem]">
            <div className="flex items-center justify-between border-b border-stone-200 px-5 py-4">
              <div className="min-w-0">
                <h3 className="truncate text-2xl font-semibold text-stone-950">{item.name}</h3>
                <p className="mt-1 text-sm text-stone-500">{disabled ? "Món này hiện đang hết hàng" : "Chọn topping và upsize cho món uống của bạn"}</p>
              </div>
              <button
                type="button"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-stone-200 text-stone-500 transition hover:bg-stone-100"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 pb-28 pt-5 md:px-6">
              <div className="overflow-hidden rounded-[1.75rem] bg-stone-100">
                {resolvedImageUrl && !imageFailed ? (
                  <img src={resolvedImageUrl} alt={item.name} className="aspect-square w-full object-cover object-center" onError={() => setImageFailed(true)} />
                ) : (
                  <div className="flex aspect-square w-full items-center justify-center text-center">
                    <div>
                      <p className="text-xs uppercase tracking-[0.24em] text-stone-500">Món uống</p>
                      <h4 className="mt-3 px-4 text-3xl font-semibold">{item.name}</h4>
                    </div>
                  </div>
                )}
              </div>

              {displayDescription ? <p className="mt-4 text-sm leading-6 text-stone-500">{displayDescription}</p> : null}

              <div className="mt-5 space-y-6">
                <section className="space-y-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-[1.75rem] font-semibold leading-tight text-stone-950">Thêm topping nhai tóp tép</p>
                      <p className="mt-1 text-sm text-stone-500">Không bắt buộc, tối đa 10 phần</p>
                    </div>
                    <span className="rounded-full bg-stone-100 px-3 py-2 text-sm font-medium text-stone-500">{`${selectedToppingCount} đã chọn`}</span>
                  </div>

                  <div className="divide-y divide-stone-200 rounded-[1.75rem] border border-stone-200 bg-white">
                    {toppings.map((topping) => {
                      const quantity = toppingState[topping.id] ?? 0;

                      return (
                        <div key={topping.id} className="flex items-center justify-between gap-4 px-4 py-4 sm:px-5">
                          <div className="min-w-0">
                            <p className="text-lg font-medium text-stone-900">{topping.name}</p>
                            <p className="mt-1 text-sm text-stone-500">+{formatCurrency(topping.price)}</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <button
                              type="button"
                              disabled={disabled}
                              className={`h-11 w-11 rounded-2xl border text-stone-600 transition ${quantity > 0 ? "border-emerald-200 bg-emerald-50" : "border-stone-200 bg-white"} ${disabled ? "cursor-not-allowed opacity-50" : ""}`}
                              onClick={() =>
                                setToppingState((current) => ({
                                  ...current,
                                  [topping.id]: Math.max((current[topping.id] ?? 0) - 1, 0),
                                }))
                              }
                            >
                              <Minus className="mx-auto h-4 w-4" />
                            </button>
                            <span className="w-8 text-center text-lg font-semibold text-stone-900">{quantity}</span>
                            <button
                              type="button"
                              disabled={disabled}
                              className={`h-11 w-11 rounded-2xl border border-emerald-200 bg-emerald-50 text-emerald-700 transition hover:bg-emerald-100 ${disabled ? "cursor-not-allowed opacity-50" : ""}`}
                              onClick={() =>
                                setToppingState((current) => ({
                                  ...current,
                                  [topping.id]: Math.min((current[topping.id] ?? 0) + 1, 5),
                                }))
                              }
                            >
                              <Plus className="mx-auto h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </section>

                <section className="space-y-4">
                  <div>
                    <p className="text-[1.75rem] font-semibold leading-tight text-stone-950">Up size to uống đã khát</p>
                    <p className="mt-1 text-sm text-stone-500">Không bắt buộc, tối đa 1 lựa chọn</p>
                  </div>

                  <div className="space-y-3 rounded-[1.75rem] border border-stone-200 bg-white p-3">
                    <button
                      type="button"
                      disabled={disabled}
                      className={`flex w-full items-center justify-between rounded-2xl border px-4 py-4 text-left transition ${selectedVariant?.id === baseVariant?.id ? "border-emerald-500 bg-emerald-50" : "border-stone-200 bg-white hover:border-stone-300"} ${disabled ? "cursor-not-allowed opacity-60" : ""}`}
                      onClick={() => setSelectedVariantId(baseVariant?.id ?? "")}
                    >
                      <div>
                        <p className="text-lg font-semibold text-stone-900">{baseVariant?.name ?? "Cốc tiêu chuẩn"}</p>
                        <p className="mt-1 text-sm text-stone-500">Giá gốc của món</p>
                      </div>
                      <span className="text-lg font-semibold text-stone-900">{formatCurrency(baseVariant?.price ?? 0)}</span>
                    </button>
                    {upsizedVariant && baseVariant && upsizedVariant.id !== baseVariant.id ? (
                      <button
                        type="button"
                        disabled={disabled}
                        className={`flex w-full items-center justify-between rounded-2xl border px-4 py-4 text-left transition ${selectedVariant?.id === upsizedVariant.id ? "border-emerald-500 bg-emerald-50" : "border-stone-200 bg-white hover:border-stone-300"} ${disabled ? "cursor-not-allowed opacity-60" : ""}`}
                        onClick={() => setSelectedVariantId(upsizedVariant.id)}
                      >
                        <div>
                          <p className="text-lg font-semibold text-stone-900">{upsizedVariant.name}</p>
                          <p className="mt-1 text-sm text-stone-500">{`Thêm ${formatCurrency(upsizedVariant.price - baseVariant.price)} để lên cốc lớn 700ml`}</p>
                        </div>
                        <span className="text-lg font-semibold text-emerald-700">+{formatCurrency(upsizedVariant.price - baseVariant.price)}</span>
                      </button>
                    ) : null}
                  </div>
                </section>
              </div>
            </div>

            <div className="absolute inset-x-0 bottom-0 border-t border-stone-200 bg-white/95 px-5 py-4 backdrop-blur md:px-6">
              <button
                type="button"
                disabled={disabled}
                className={`w-full rounded-[1.4rem] px-6 py-4 text-xl font-semibold text-white transition ${disabled ? "bg-stone-300 shadow-none cursor-not-allowed" : "bg-emerald-500 shadow-lg shadow-emerald-500/30 hover:bg-emerald-600"}`}
                onClick={addToCart}
              >
                {disabled ? "Món này hiện đang hết hàng" : isAdded ? "Đã thêm vào giỏ" : `Thêm vào giỏ hàng - ${formatCurrency(totalPrice)}`}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
