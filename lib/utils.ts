import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const VIETNAM_TIME_ZONE = "Asia/Ho_Chi_Minh";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDateTime(input: Date | string) {
  return new Intl.DateTimeFormat("vi-VN", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: VIETNAM_TIME_ZONE,
  }).format(new Date(input));
}
