import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { isFirebaseAdminConfigured } from "@/lib/firebase-admin";
import { registerAdminPushSubscription, unregisterAdminPushSubscription } from "@/lib/push-notifications";

export const dynamic = "force-dynamic";

type PushSubscriptionBody = {
  token?: string;
};

async function requireAdmin() {
  const session = await auth();

  if (!session?.user || session.user.role !== "ADMIN" || !session.user.id) {
    return null;
  }

  return session.user;
}

export async function POST(request: Request) {
  const adminUser = await requireAdmin();

  if (!adminUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!isFirebaseAdminConfigured()) {
    return NextResponse.json({ error: "Firebase Admin is not configured." }, { status: 503 });
  }

  const body = (await request.json()) as PushSubscriptionBody;
  const token = body.token?.trim();

  if (!token) {
    return NextResponse.json({ error: "Missing token." }, { status: 400 });
  }

  await registerAdminPushSubscription({
    userId: adminUser.id,
    token,
    userAgent: request.headers.get("user-agent"),
  });

  return NextResponse.json({ ok: true });
}

export async function DELETE(request: Request) {
  const adminUser = await requireAdmin();

  if (!adminUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json()) as PushSubscriptionBody;
  const token = body.token?.trim();

  if (!token) {
    return NextResponse.json({ error: "Missing token." }, { status: 400 });
  }

  await unregisterAdminPushSubscription(token);

  return NextResponse.json({ ok: true });
}
