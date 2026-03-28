"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { CartItem } from "@/types/cart";

type CartContextValue = {
  items: CartItem[];
  itemCount: number;
  totalAmount: number;
  addItem: (item: Omit<CartItem, "quantity">) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  removeItem: (cartItemId: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);
const STORAGE_KEY = "restaurant-cart";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const raw = window.localStorage.getItem(STORAGE_KEY);

    if (raw) {
      try {
        setItems(JSON.parse(raw) as CartItem[]);
      } catch {
        window.localStorage.removeItem(STORAGE_KEY);
      }
    }

    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (!isLoaded) {
      return;
    }

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [isLoaded, items]);

  const value = useMemo<CartContextValue>(() => {
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
    const totalAmount = items.reduce((sum, item) => sum + item.totalPrice * item.quantity, 0);

    return {
      items,
      itemCount,
      totalAmount,
      addItem: (item) =>
        setItems((current) => {
          const existing = current.find((entry) => entry.cartItemId === item.cartItemId);

          if (existing) {
            return current.map((entry) =>
              entry.cartItemId === item.cartItemId
                ? {
                    ...entry,
                    quantity: entry.quantity + 1,
                  }
                : entry,
            );
          }

          return [...current, { ...item, quantity: 1 }];
        }),
      updateQuantity: (cartItemId, quantity) =>
        setItems((current) =>
          current.flatMap((item) => {
            if (item.cartItemId !== cartItemId) {
              return [item];
            }

            if (quantity <= 0) {
              return [];
            }

            return [{ ...item, quantity }];
          }),
        ),
      removeItem: (cartItemId) => setItems((current) => current.filter((item) => item.cartItemId !== cartItemId)),
      clearCart: () => setItems([]),
    };
  }, [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }

  return context;
}
