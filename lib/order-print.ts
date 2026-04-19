import { formatCurrency, formatDateTime } from "@/lib/utils";

export const AUTO_PRINT_PREFERENCE_KEY = "admin-order-auto-print-enabled";
export const LAST_AUTO_PRINTED_ORDER_KEY = "admin-last-auto-printed-order-id";

export type PrintableOrder = {
  id: string;
  orderCode: number;
  customerName: string;
  phoneNumber: string;
  deliveryAddress: string;
  note: string | null;
  totalAmount: number;
  status: "NEW" | "PREPARING" | "COMPLETED" | "CANCELLED";
  createdAt: string;
  customer: {
    name: string | null;
    email: string | null;
  } | null;
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
      quantity: number;
      lineTotal: number;
    }>;
  }>;
};

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function getStatusLabel(status: PrintableOrder["status"]) {
  switch (status) {
    case "NEW":
      return "Moi";
    case "PREPARING":
      return "Dang chuan bi";
    case "COMPLETED":
      return "Hoan tat";
    case "CANCELLED":
      return "Da huy";
    default:
      return status;
  }
}

export function buildOrderPrintDocument(order: PrintableOrder) {
  const itemMarkup = order.items
    .map((item) => {
      const toppingsMarkup =
        item.toppings.length > 0
          ? `
            <div class="subtext">
              Topping: ${item.toppings
                .map((topping) => `${escapeHtml(topping.name)} x${topping.quantity} (+${escapeHtml(formatCurrency(topping.lineTotal))})`)
                .join(", ")}
            </div>
          `
          : "";

      const noteMarkup = item.note ? `<div class="subtext">Ghi chu mon: ${escapeHtml(item.note)}</div>` : "";

      return `
        <div class="item">
          <div class="row strong">
            <span>${escapeHtml(item.menuItem.name)} - ${escapeHtml(item.variantName)} x ${item.quantity}</span>
            <span>${escapeHtml(formatCurrency(item.quantity * item.unitPrice))}</span>
          </div>
          ${toppingsMarkup}
          ${noteMarkup}
        </div>
      `;
    })
    .join("");

  const customerAccountMarkup = order.customer
    ? `
      <div class="section">
        <div class="label">Tai khoan dat mon</div>
        <div class="value">${escapeHtml(order.customer.name ?? "Khach Google")}</div>
        <div class="subtext">${escapeHtml(order.customer.email ?? "Khong co email")}</div>
      </div>
    `
    : "";

  const noteMarkup = order.note
    ? `<div class="value note-box">${escapeHtml(order.note)}</div>`
    : `<div class="value note-box">Khong co ghi chu cho don nay.</div>`;

  return `
    <!doctype html>
    <html lang="vi">
      <head>
        <meta charset="utf-8" />
        <title>Don #${order.orderCode}</title>
        <style>
          @page {
            margin: 10mm;
          }

          * {
            box-sizing: border-box;
          }

          html, body {
            margin: 0;
            padding: 0;
            background: #ffffff;
            color: #111827;
            font-family: "Segoe UI", Arial, sans-serif;
          }

          body {
            padding: 12px;
          }

          .receipt {
            width: 100%;
            max-width: 360px;
            margin: 0 auto;
            border: 1px solid #e7e5e4;
            border-radius: 16px;
            padding: 18px 16px;
          }

          .center {
            text-align: center;
          }

          .title {
            font-size: 24px;
            font-weight: 700;
            margin: 0;
          }

          .muted {
            color: #57534e;
            font-size: 12px;
            line-height: 1.5;
          }

          .section {
            margin-top: 16px;
            padding-top: 16px;
            border-top: 1px dashed #d6d3d1;
          }

          .label {
            font-size: 11px;
            text-transform: uppercase;
            letter-spacing: 0.08em;
            color: #9a3412;
            margin-bottom: 6px;
          }

          .value {
            font-size: 14px;
            line-height: 1.6;
          }

          .strong {
            font-weight: 700;
          }

          .row {
            display: flex;
            justify-content: space-between;
            gap: 12px;
          }

          .item + .item {
            margin-top: 12px;
          }

          .subtext {
            margin-top: 4px;
            font-size: 12px;
            color: #57534e;
            line-height: 1.5;
          }

          .total {
            font-size: 22px;
            color: #c2410c;
            font-weight: 700;
          }

          .note-box {
            border-radius: 12px;
            background: #f5f5f4;
            padding: 10px 12px;
          }
        </style>
      </head>
      <body>
        <main class="receipt">
          <div class="center">
            <p class="label">Phieu don hang</p>
            <h1 class="title">Don #${order.orderCode}</h1>
            <p class="muted">${escapeHtml(getStatusLabel(order.status))} - ${escapeHtml(formatDateTime(order.createdAt))}</p>
          </div>

          <div class="section">
            <div class="label">Nguoi nhan</div>
            <div class="value strong">${escapeHtml(order.customerName)}</div>
            <div class="subtext">${escapeHtml(order.phoneNumber)}</div>
          </div>

          ${customerAccountMarkup}

          <div class="section">
            <div class="label">Dia chi giao hang</div>
            <div class="value note-box">${escapeHtml(order.deliveryAddress)}</div>
          </div>

          <div class="section">
            <div class="label">Chi tiet mon</div>
            ${itemMarkup}
          </div>

          <div class="section">
            <div class="label">Ghi chu</div>
            ${noteMarkup}
          </div>

          <div class="section">
            <div class="row">
              <span class="label">Tong tien</span>
              <span class="total">${escapeHtml(formatCurrency(order.totalAmount))}</span>
            </div>
          </div>
        </main>
      </body>
    </html>
  `;
}
