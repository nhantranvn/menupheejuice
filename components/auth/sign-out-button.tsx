"use client";

import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

export function SignOutButton() {
  return (
    <button
      type="button"
      className="button-secondary px-4 py-2 text-sm"
      onClick={() => signOut({ callbackUrl: "/" })}
    >
      <LogOut className="mr-2 h-4 w-4" />
      {"Đăng xuất"}
    </button>
  );
}