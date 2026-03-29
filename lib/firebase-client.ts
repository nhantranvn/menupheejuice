"use client";

import { getApp, getApps, initializeApp, type FirebaseApp } from "firebase/app";
import { getFirebaseWebConfig, getFirebaseVapidKey, isFirebaseWebPushConfigured } from "@/lib/firebase-config";

export function getFirebaseClientApp(): FirebaseApp {
  const config = getFirebaseWebConfig();

  if (!config) {
    throw new Error("Firebase Web config is not configured.");
  }

  return getApps().length > 0 ? getApp() : initializeApp(config);
}

export function getFirebaseServiceWorkerConfig() {
  return getFirebaseWebConfig();
}

export { getFirebaseVapidKey, isFirebaseWebPushConfigured };
