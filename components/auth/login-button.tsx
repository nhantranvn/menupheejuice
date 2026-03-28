"use client";

import { useState } from "react";
import { Chrome } from "lucide-react";
import { signIn } from "next-auth/react";

type LoginButtonProps = {
  callbackUrl?: string;
};

export function LoginButton({ callbackUrl = "/menu" }: LoginButtonProps) {
  const [isPending, setIsPending] = useState(false);

  return (
    <button
      type="button"
      className="button-primary w-full sm:w-auto"
      onClick={async () => {
        setIsPending(true);
        await signIn("google", { callbackUrl });
      }}
      disabled={isPending}
    >
      <Chrome className="mr-2 h-4 w-4" />
      {isPending ? "Đang chuyển hướng..." : "Đăng nhập bằng Google"}
    </button>
  );
}
