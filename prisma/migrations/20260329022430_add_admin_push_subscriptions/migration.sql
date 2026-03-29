-- CreateTable
CREATE TABLE "AdminPushSubscription" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "userAgent" TEXT,
    "lastSeenAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AdminPushSubscription_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AdminPushSubscription_token_key" ON "AdminPushSubscription"("token");

-- CreateIndex
CREATE INDEX "AdminPushSubscription_userId_idx" ON "AdminPushSubscription"("userId");

-- AddForeignKey
ALTER TABLE "AdminPushSubscription" ADD CONSTRAINT "AdminPushSubscription_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
