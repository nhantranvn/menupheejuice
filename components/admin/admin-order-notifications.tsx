"use client";

import { Bell, BellRing, RefreshCw, Smartphone, Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { formatCurrency, formatDateTime } from "@/lib/utils";
import { getFirebaseClientApp, getFirebaseVapidKey, isFirebaseWebPushConfigured } from "@/lib/firebase-client";

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
type PushState = "unknown" | "unsupported" | "unconfigured" | "disabled" | "registering" | "enabled" | "error";
type AudioContextRef = {
  current: AudioContext | null;
};
type ServiceWorkerRegistrationRef = {
  current: ServiceWorkerRegistration | null;
};
type WindowWithWebkitAudioContext = Window &
  typeof globalThis & {
    webkitAudioContext?: typeof AudioContext;
  };
type FcmOrderData = {
  orderId?: string;
  orderCode?: string;
  customerName?: string;
  totalAmount?: string;
  createdAt?: string;
};

const SOUND_PREFERENCE_KEY = "admin-order-sound-enabled";
const FCM_TOKEN_STORAGE_KEY = "admin-fcm-token";

function canUseBrowserNotifications() {
  return typeof window !== "undefined" && "Notification" in window;
}

function canUseServiceWorkerNotifications() {
  return typeof navigator !== "undefined" && "serviceWorker" in navigator;
}

function canUseVibration() {
  return typeof navigator !== "undefined" && "vibrate" in navigator;
}

function getAudioContextConstructor() {
  if (typeof window === "undefined") {
    return null;
  }

  return window.AudioContext ?? (window as WindowWithWebkitAudioContext).webkitAudioContext ?? null;
}

async function ensureAudioContext(audioContextRef: AudioContextRef) {
  if (audioContextRef.current) {
    return audioContextRef.current;
  }

  const AudioContextConstructor = getAudioContextConstructor();

  if (!AudioContextConstructor) {
    return null;
  }

  const audioContext = new AudioContextConstructor();
  audioContextRef.current = audioContext;
  return audioContext;
}

async function playNotificationSound(audioContextRef: AudioContextRef) {
  const audioContext = await ensureAudioContext(audioContextRef);

  if (!audioContext) {
    return false;
  }

  if (audioContext.state === "suspended") {
    await audioContext.resume();
  }

  const startAt = audioContext.currentTime + 0.02;
  const tones = [
    { frequency: 880, duration: 0.12, delay: 0, volume: 0.22 },
    { frequency: 1320, duration: 0.18, delay: 0.16, volume: 0.18 },
  ];

  tones.forEach(({ frequency, duration, delay, volume }) => {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    const toneStartAt = startAt + delay;
    const toneEndAt = toneStartAt + duration;

    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(frequency, toneStartAt);

    gainNode.gain.setValueAtTime(0.0001, toneStartAt);
    gainNode.gain.exponentialRampToValueAtTime(volume, toneStartAt + 0.02);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, toneEndAt);

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    oscillator.start(toneStartAt);
    oscillator.stop(toneEndAt);
  });

  return true;
}

async function showOrderNotification(order: OrderSnapshot, serviceWorkerRegistrationRef: ServiceWorkerRegistrationRef) {
  if (!canUseBrowserNotifications() || Notification.permission !== "granted") {
    return;
  }

  const title = `Don moi #${order.orderCode}`;
  const body = `${order.customerName} vua dat ${formatCurrency(order.totalAmount)} luc ${formatDateTime(order.createdAt)}.`;
  const options = {
    body,
    tag: `order-${order.id}`,
    icon: "/favicon.ico",
    badge: "/favicon.ico",
    data: {
      url: "/admin/orders",
    },
    requireInteraction: true,
    renotify: true,
  };

  if (serviceWorkerRegistrationRef.current) {
    await serviceWorkerRegistrationRef.current.showNotification(title, options);
    return;
  }

  const notification = new Notification(title, options);
  notification.onclick = () => {
    window.focus();
  };
}

function getStoredFcmToken() {
  if (typeof window === "undefined") {
    return null;
  }

  return window.localStorage.getItem(FCM_TOKEN_STORAGE_KEY);
}

function parseOrderFromPushData(data: FcmOrderData | undefined): OrderSnapshot | null {
  if (!data?.orderId || !data.orderCode || !data.customerName || !data.totalAmount || !data.createdAt) {
    return null;
  }

  const orderCode = Number(data.orderCode);
  const totalAmount = Number(data.totalAmount);

  if (!Number.isFinite(orderCode) || !Number.isFinite(totalAmount)) {
    return null;
  }

  return {
    id: data.orderId,
    orderCode,
    customerName: data.customerName,
    totalAmount,
    createdAt: data.createdAt,
  };
}

export function AdminOrderNotifications({ initialLatestOrder, initialNewOrderCount }: Props) {
  const router = useRouter();
  const [latestOrder, setLatestOrder] = useState<OrderSnapshot | null>(initialLatestOrder);
  const [newOrderCount, setNewOrderCount] = useState(initialNewOrderCount);
  const [announcement, setAnnouncement] = useState<string | null>(null);
  const [permission, setPermission] = useState<BrowserNotificationState>("unknown");
  const [pushState, setPushState] = useState<PushState>("unknown");
  const [pushError, setPushError] = useState<string | null>(null);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [isSoundSupported, setIsSoundSupported] = useState(false);
  const [isRefreshing, startTransition] = useTransition();
  const latestOrderIdRef = useRef<string | null>(initialLatestOrder?.id ?? null);
  const baseTitleRef = useRef("Phee Juice Tran Cung");
  const audioContextRef = useRef<AudioContext | null>(null);
  const serviceWorkerRegistrationRef = useRef<ServiceWorkerRegistration | null>(null);
  const soundEnabledRef = useRef(false);

  useEffect(() => {
    soundEnabledRef.current = soundEnabled;
  }, [soundEnabled]);

  useEffect(() => {
    if (typeof document !== "undefined") {
      baseTitleRef.current = document.title;
    }

    if (typeof window !== "undefined") {
      const savedSoundEnabled = window.localStorage.getItem(SOUND_PREFERENCE_KEY) === "true";
      setSoundEnabled(savedSoundEnabled);
      soundEnabledRef.current = savedSoundEnabled;
    }

    setIsSoundSupported(Boolean(getAudioContextConstructor()));

    if (!canUseBrowserNotifications()) {
      setPermission("unsupported");
      setPushState("unsupported");
      return;
    }

    setPermission(Notification.permission);
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") {
      return;
    }

    document.title = newOrderCount > 0 ? `(${newOrderCount}) Don moi | ${baseTitleRef.current}` : baseTitleRef.current;

    return () => {
      document.title = baseTitleRef.current;
    };
  }, [newOrderCount]);

  useEffect(() => {
    let isMounted = true;
    let unsubscribeOnMessage: (() => void) | undefined;

    const initializePush = async () => {
      if (!isFirebaseWebPushConfigured()) {
        if (isMounted) {
          setPushState("unconfigured");
        }
        return;
      }

      if (!canUseBrowserNotifications() || !canUseServiceWorkerNotifications()) {
        if (isMounted) {
          setPushState("unsupported");
        }
        return;
      }

      try {
        const [{ isSupported, getMessaging, onMessage }] = await Promise.all([import("firebase/messaging")]);
        const supported = await isSupported();

        if (!supported) {
          if (isMounted) {
            setPushState("unsupported");
          }
          return;
        }

        const registration = await navigator.serviceWorker.register("/firebase-messaging-sw.js");
        const readyRegistration = await navigator.serviceWorker.ready;
        serviceWorkerRegistrationRef.current = readyRegistration ?? registration;

        const messaging = getMessaging(getFirebaseClientApp());
        unsubscribeOnMessage = onMessage(messaging, (payload) => {
          const realtimeOrder = parseOrderFromPushData(payload.data as FcmOrderData | undefined);

          if (!realtimeOrder || realtimeOrder.id === latestOrderIdRef.current) {
            return;
          }

          latestOrderIdRef.current = realtimeOrder.id;
          setLatestOrder(realtimeOrder);
          setNewOrderCount((currentCount) => currentCount + 1);
          setAnnouncement(`Co don moi #${realtimeOrder.orderCode} tu ${realtimeOrder.customerName}. Danh sach don da duoc cap nhat.`);

          if (soundEnabledRef.current) {
            void playNotificationSound(audioContextRef).catch(() => false);
          }

          if (canUseVibration()) {
            navigator.vibrate([220, 120, 220]);
          }

          void showOrderNotification(realtimeOrder, serviceWorkerRegistrationRef).catch(() => false);

          startTransition(() => {
            router.refresh();
          });
        });

        if (isMounted) {
          setPushState(Notification.permission === "granted" ? "registering" : "disabled");
        }

        if (Notification.permission === "granted") {
          void syncPushToken(false);
        }
      } catch (error) {
        console.error("Failed to initialize Firebase push messaging", error);

        if (isMounted) {
          setPushState("error");
          setPushError("Khong the khoi tao push tren thiet bi nay.");
        }
      }
    };

    void initializePush();

    return () => {
      isMounted = false;
      unsubscribeOnMessage?.();
    };
  }, [router]);

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
          setAnnouncement(`Co don moi #${data.latestOrder.orderCode} tu ${data.latestOrder.customerName}. Danh sach don da duoc cap nhat.`);

          if (soundEnabledRef.current) {
            void playNotificationSound(audioContextRef).catch(() => false);
          }

          if (canUseVibration()) {
            navigator.vibrate([220, 120, 220]);
          }

          void showOrderNotification(data.latestOrder, serviceWorkerRegistrationRef).catch(() => false);

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

    void pollLatestOrder();
    const intervalId = window.setInterval(pollLatestOrder, 15000);

    return () => {
      active = false;
      window.clearInterval(intervalId);
    };
  }, [router]);

  const syncPushToken = async (requestPermission: boolean) => {
    if (!isFirebaseWebPushConfigured()) {
      setPushState("unconfigured");
      setPushError("Thieu bien moi truong Firebase Web Push.");
      return false;
    }

    if (!canUseBrowserNotifications() || !canUseServiceWorkerNotifications()) {
      setPushState("unsupported");
      return false;
    }

    setPushState("registering");
    setPushError(null);

    try {
      const [{ getMessaging, getToken, isSupported }] = await Promise.all([import("firebase/messaging")]);
      const supported = await isSupported();

      if (!supported) {
        setPushState("unsupported");
        return false;
      }

      let nextPermission = Notification.permission;

      if (requestPermission && nextPermission !== "granted") {
        nextPermission = await Notification.requestPermission();
        setPermission(nextPermission);
      }

      if (nextPermission !== "granted") {
        setPushState("disabled");
        return false;
      }

      const registration =
        serviceWorkerRegistrationRef.current ??
        (await navigator.serviceWorker.register("/firebase-messaging-sw.js"));
      const readyRegistration = await navigator.serviceWorker.ready;
      serviceWorkerRegistrationRef.current = readyRegistration ?? registration;

      const vapidKey = getFirebaseVapidKey();

      if (!vapidKey) {
        setPushState("unconfigured");
        setPushError("Thieu VAPID key cho Firebase Web Push.");
        return false;
      }

      const messaging = getMessaging(getFirebaseClientApp());
      const token = await getToken(messaging, {
        vapidKey,
        serviceWorkerRegistration: serviceWorkerRegistrationRef.current,
      });

      if (!token) {
        setPushState("error");
        setPushError("Khong lay duoc FCM token tren trinh duyet nay.");
        return false;
      }

      const previousToken = getStoredFcmToken();

      if (previousToken && previousToken !== token) {
        await fetch("/api/admin/push-subscriptions", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token: previousToken }),
        }).catch(() => undefined);
      }

      const response = await fetch("/api/admin/push-subscriptions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      });

      if (!response.ok) {
        if (response.status === 503) {
          setPushState("unconfigured");
          setPushError("Server chua duoc cau hinh Firebase Admin.");
        } else {
          setPushState("error");
          setPushError("Dang ky token push that bai.");
        }

        return false;
      }

      window.localStorage.setItem(FCM_TOKEN_STORAGE_KEY, token);
      setPushState("enabled");
      setPermission("granted");

      if (requestPermission) {
        await playNotificationSound(audioContextRef).catch(() => false);
      }

      return true;
    } catch (error) {
      console.error("Failed to register FCM push token", error);
      setPushState("error");
      setPushError("Khong dang ky duoc push notification.");
      return false;
    }
  };

  const requestNotificationPermission = async () => {
    if (!canUseBrowserNotifications()) {
      setPermission("unsupported");
      return;
    }

    const result = await Notification.requestPermission();
    setPermission(result);
  };

  const toggleSoundAlerts = async () => {
    if (!isSoundSupported || typeof window === "undefined") {
      return;
    }

    if (soundEnabled) {
      window.localStorage.setItem(SOUND_PREFERENCE_KEY, "false");
      setSoundEnabled(false);
      return;
    }

    const soundReady = await playNotificationSound(audioContextRef).catch(() => false);
    window.localStorage.setItem(SOUND_PREFERENCE_KEY, soundReady ? "true" : "false");
    setSoundEnabled(soundReady);
  };

  const pushStatusText =
    pushState === "enabled"
      ? "Push dien thoai da san sang"
      : pushState === "registering"
        ? "Dang dang ky push..."
        : pushState === "disabled"
          ? "Push chua duoc cap quyen"
          : pushState === "unconfigured"
            ? "Firebase Push chua cau hinh xong"
            : pushState === "unsupported"
              ? "Thiet bi trinh duyet nay khong ho tro FCM"
              : pushState === "error"
                ? "Co loi khi dang ky push"
                : "Dang kiem tra push";

  return (
    <section className="surface p-5 sm:p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-orange-600">Thong bao don moi</p>
          <h2 className="mt-2 text-2xl font-bold">Theo doi don hang theo thoi gian gan thuc</h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-stone-500">
            Trang nay vua polling don moi, vua co the dang ky Firebase Cloud Messaging de gui push nen cho thiet bi admin. Khi push hoat dong, thong bao se den nhanh hon va khong phu thuoc viec tab dang mo.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <div className="rounded-3xl bg-stone-50 px-5 py-4">
            <p className="text-sm text-stone-500">Don moi cho xu ly</p>
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
            {isRefreshing ? "Dang lam moi..." : "Lam moi ngay"}
          </button>

          {permission === "default" ? (
            <button type="button" className="button-secondary gap-2" onClick={requestNotificationPermission}>
              <Bell className="h-4 w-4" />
              Cap quyen thong bao
            </button>
          ) : null}

          <button
            type="button"
            className={pushState === "enabled" ? "button-primary gap-2" : "button-secondary gap-2"}
            onClick={() => {
              void syncPushToken(true);
            }}
            disabled={pushState === "registering" || pushState === "unsupported"}
          >
            {pushState === "enabled" ? <BellRing className="h-4 w-4" /> : <Smartphone className="h-4 w-4" />}
            {pushState === "enabled" ? "Push da bat" : pushState === "registering" ? "Dang bat push..." : "Bat push dien thoai"}
          </button>

          <button
            type="button"
            className={soundEnabled ? "button-primary gap-2" : "button-secondary gap-2"}
            onClick={() => {
              void toggleSoundAlerts();
            }}
            disabled={!isSoundSupported}
          >
            {soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
            {isSoundSupported ? (soundEnabled ? "Am thanh da bat" : "Bat am thanh canh bao") : "Thiet bi khong ho tro am thanh"}
          </button>
        </div>
      </div>

      <div className="mt-4 rounded-3xl border border-stone-200 bg-white px-5 py-4 text-sm text-stone-600">
        <div className="flex flex-wrap items-center gap-2">
          {pushState === "enabled" ? <BellRing className="h-4 w-4 text-emerald-600" /> : <Bell className="h-4 w-4 text-stone-400" />}
          <span>{pushStatusText}</span>
        </div>
        {pushError ? <p className="mt-2 text-rose-600">{pushError}</p> : null}
      </div>

      {announcement ? (
        <div className="mt-4 rounded-3xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm text-emerald-800">
          {announcement}
        </div>
      ) : null}

      <p className="mt-4 text-sm text-stone-500">
        Push FCM se can them bo khoa Firebase trong env. Tren mot so iPhone, thong bao nen web thuong chi on dinh khi website duoc them vao man hinh chinh.
      </p>

      {latestOrder ? (
        <div className="mt-4 rounded-3xl bg-stone-50 px-5 py-4 text-sm text-stone-600">
          <span className="font-semibold text-stone-900">Don gan nhat:</span> #{latestOrder.orderCode} - {latestOrder.customerName} - {formatCurrency(latestOrder.totalAmount)} - {formatDateTime(latestOrder.createdAt)}
        </div>
      ) : null}
    </section>
  );
}
