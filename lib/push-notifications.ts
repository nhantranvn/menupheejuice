import "server-only";

import { prisma } from "@/lib/prisma";
import { isFirebaseAdminConfigured, getFirebaseAdminMessaging } from "@/lib/firebase-admin";
import { formatCurrency, formatDateTime } from "@/lib/utils";

export const ADMIN_ORDERS_FCM_TOPIC = "admin-orders";

function getAppBaseUrl() {
  if (process.env.AUTH_URL) {
    return process.env.AUTH_URL;
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  return null;
}

function getAdminOrdersUrl() {
  const baseUrl = getAppBaseUrl();
  return baseUrl ? `${baseUrl}/admin/orders` : "/admin/orders";
}

export async function registerAdminPushSubscription(input: {
  userId: string;
  token: string;
  userAgent?: string | null;
}) {
  if (!isFirebaseAdminConfigured()) {
    throw new Error("Firebase Admin is not configured.");
  }

  await prisma.adminPushSubscription.upsert({
    where: {
      token: input.token,
    },
    update: {
      userId: input.userId,
      userAgent: input.userAgent ?? undefined,
      lastSeenAt: new Date(),
    },
    create: {
      userId: input.userId,
      token: input.token,
      userAgent: input.userAgent ?? undefined,
    },
  });

  await getFirebaseAdminMessaging().subscribeToTopic([input.token], ADMIN_ORDERS_FCM_TOPIC);
}

export async function unregisterAdminPushSubscription(token: string) {
  if (isFirebaseAdminConfigured()) {
    await getFirebaseAdminMessaging().unsubscribeFromTopic([token], ADMIN_ORDERS_FCM_TOPIC);
  }

  await prisma.adminPushSubscription.deleteMany({
    where: {
      token,
    },
  });
}

export async function sendNewOrderAdminPush(input: {
  orderId: string;
  orderCode: number;
  customerName: string;
  totalAmount: number;
  createdAt: Date;
}) {
  if (!isFirebaseAdminConfigured()) {
    return { ok: false as const, reason: "not-configured" };
  }

  const adminOrdersUrl = getAdminOrdersUrl();

  await getFirebaseAdminMessaging().send({
    topic: ADMIN_ORDERS_FCM_TOPIC,
    notification: {
      title: `Don moi #${input.orderCode}`,
      body: `${input.customerName} vua dat ${formatCurrency(input.totalAmount)} luc ${formatDateTime(input.createdAt)}.`,
    },
    data: {
      orderId: input.orderId,
      orderCode: String(input.orderCode),
      customerName: input.customerName,
      totalAmount: String(input.totalAmount),
      createdAt: input.createdAt.toISOString(),
      url: adminOrdersUrl,
    },
    webpush: {
      headers: {
        Urgency: "high",
      },
      notification: {
        icon: "/favicon.ico",
        badge: "/favicon.ico",
        requireInteraction: true,
      },
      fcmOptions: {
        link: adminOrdersUrl,
      },
    },
  });

  return { ok: true as const };
}
