import "server-only";

import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getMessaging } from "firebase-admin/messaging";
import { getStorage } from "firebase-admin/storage";

function getFirebaseAdminConfig() {
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (!projectId || !clientEmail || !privateKey) {
    return null;
  }

  return {
    projectId,
    clientEmail,
    privateKey,
  };
}

export function isFirebaseAdminConfigured() {
  return Boolean(getFirebaseAdminConfig());
}

function initializeFirebaseAdmin() {
  const config = getFirebaseAdminConfig();
  if (!config) {
    throw new Error("Firebase Admin is not configured.");
  }

  if (getApps().length === 0) {
    return initializeApp({
      credential: cert(config),
      projectId: config.projectId,
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || `${config.projectId}.firebasestorage.app`,
    });
  }
  return getApps()[0];
}

export function getFirebaseAdminMessaging() {
  initializeFirebaseAdmin();
  return getMessaging();
}

export function getFirebaseAdminStorage() {
  const app = initializeFirebaseAdmin();
  return getStorage(app);
}
