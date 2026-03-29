import "server-only";

import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getMessaging } from "firebase-admin/messaging";

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

export function getFirebaseAdminMessaging() {
  const config = getFirebaseAdminConfig();

  if (!config) {
    throw new Error("Firebase Admin is not configured.");
  }

  if (getApps().length === 0) {
    initializeApp({
      credential: cert(config),
      projectId: config.projectId,
    });
  }

  return getMessaging();
}
