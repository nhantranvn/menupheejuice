"use client";

import { buildOrderPrintDocument, type PrintableOrder } from "@/lib/order-print";

type PrintableOrderResponse = {
  order: PrintableOrder;
};

function printHtmlDocument(html: string) {
  const iframe = document.createElement("iframe");
  iframe.setAttribute("aria-hidden", "true");
  iframe.style.position = "fixed";
  iframe.style.right = "0";
  iframe.style.bottom = "0";
  iframe.style.width = "0";
  iframe.style.height = "0";
  iframe.style.border = "0";

  const cleanup = () => {
    window.setTimeout(() => {
      iframe.remove();
    }, 1000);
  };

  iframe.onload = () => {
    const printWindow = iframe.contentWindow;

    if (!printWindow) {
      cleanup();
      return;
    }

    printWindow.focus();
    window.setTimeout(() => {
      printWindow.print();
      cleanup();
    }, 150);
  };

  document.body.appendChild(iframe);
  iframe.srcdoc = html;
}

export async function fetchPrintableOrder(orderId: string) {
  const response = await fetch(`/api/admin/orders/${orderId}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("Don hang khong con ton tai.");
    }

    if (response.status === 401) {
      throw new Error("Ban can dang nhap admin de in don.");
    }

    throw new Error("Khong tai duoc du lieu don hang de in.");
  }

  return (await response.json()) as PrintableOrderResponse;
}

export async function printOrderById(orderId: string) {
  const { order } = await fetchPrintableOrder(orderId);
  printHtmlDocument(buildOrderPrintDocument(order));
  return order;
}
