import { NextResponse } from "next/server";
import { getFirebaseWebConfig } from "@/lib/firebase-config";

export const dynamic = "force-dynamic";

const firebaseVersion = "12.11.0";

function getServiceWorkerSource() {
  const config = getFirebaseWebConfig();

  const lines = [
    "self.addEventListener('install', () => { self.skipWaiting(); });",
    "self.addEventListener('activate', (event) => { event.waitUntil(self.clients.claim()); });",
    "self.addEventListener('notificationclick', (event) => {",
    "  event.notification.close();",
    "  const fallbackUrl = new URL('/admin/orders', self.location.origin).href;",
    "  const rawTargetUrl = event.notification?.data?.url || fallbackUrl;",
    "  const targetUrl = new URL(rawTargetUrl, self.location.origin).href;",
    "  event.waitUntil(",
    "    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clients) => {",
    "      for (const client of clients) {",
    "        if ((client.url === targetUrl || client.url === fallbackUrl) && 'focus' in client) {",
    "          return client.focus();",
    "        }",
    "      }",
    "      if (self.clients.openWindow) {",
    "        return self.clients.openWindow(targetUrl);",
    "      }",
    "      return undefined;",
    "    })",
    "  );",
    "});",
  ];

  if (config) {
    lines.push(
      `importScripts('https://www.gstatic.com/firebasejs/${firebaseVersion}/firebase-app-compat.js');`,
      `importScripts('https://www.gstatic.com/firebasejs/${firebaseVersion}/firebase-messaging-compat.js');`,
      `firebase.initializeApp(${JSON.stringify(config)});`,
      "firebase.messaging();",
    );
  }

  return lines.join("\n");
}

export async function GET() {
  return new NextResponse(getServiceWorkerSource(), {
    headers: {
      "Content-Type": "application/javascript; charset=utf-8",
      "Cache-Control": "no-store, max-age=0",
    },
  });
}
