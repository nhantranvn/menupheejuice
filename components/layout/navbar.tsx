import Image from "next/image";
import Link from "next/link";
import { ClipboardList, ImagePlus, ShieldCheck } from "lucide-react";
import { auth } from "@/auth";
import { CartNavButton } from "@/components/cart/cart-nav-button";
import { SignOutButton } from "@/components/auth/sign-out-button";

export async function Navbar() {
  const session = await auth();

  return (
    <header className="sticky top-0 z-40 border-b border-stone-200/70 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex min-w-0 items-center gap-3">
          <Image src="/phee-juice-logo.svg" alt="Phee Juice logo" width={44} height={44} className="h-11 w-11 rounded-2xl object-contain" />
          <div className="min-w-0">
            <p className="text-lg font-semibold">Phee Juice Trần Cung</p>
            <p className="text-sm text-stone-500">Đặt món trực tuyến cho quán nước</p>
            <p className="text-xs text-stone-400">0984.339.499 • 36 ngõ 120 Trần Cung</p>
          </div>
        </Link>

        <div className="flex items-center gap-3">
          <nav className="hidden items-center gap-2 md:flex">
            <Link href="/menu" className="rounded-full px-4 py-2 text-sm font-medium text-stone-600 transition hover:bg-stone-100 hover:text-stone-950">
              Thực đơn
            </Link>
            <Link href="/cart" className="rounded-full px-4 py-2 text-sm font-medium text-stone-600 transition hover:bg-stone-100 hover:text-stone-950">
              Giỏ hàng
            </Link>
            {session?.user ? (
              <Link href="/orders" className="inline-flex items-center rounded-full px-4 py-2 text-sm font-medium text-stone-600 transition hover:bg-stone-100 hover:text-stone-950">
                <ClipboardList className="mr-2 h-4 w-4" />
                Đơn của tôi
              </Link>
            ) : null}
            {session?.user.role === "ADMIN" ? (
              <>
                <Link href="/admin/orders" className="inline-flex items-center rounded-full px-4 py-2 text-sm font-medium text-orange-700 transition hover:bg-orange-50">
                  <ShieldCheck className="mr-2 h-4 w-4" />
                  Quản trị
                </Link>
                <Link href="/admin/menu-items" className="inline-flex items-center rounded-full px-4 py-2 text-sm font-medium text-stone-600 transition hover:bg-stone-100 hover:text-stone-950">
                  <ImagePlus className="mr-2 h-4 w-4" />
                  Ảnh món
                </Link>
              </>
            ) : null}
          </nav>

          <CartNavButton />

          {session?.user ? (
            <div className="hidden items-center gap-3 md:flex">
              <div className="text-right">
                <p className="text-sm font-semibold">{session.user.name ?? session.user.email}</p>
                <p className="text-xs uppercase tracking-[0.18em] text-stone-400">{session.user.role}</p>
              </div>
              <SignOutButton />
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
}
