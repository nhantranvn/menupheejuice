import NextAuth from "next-auth";
import { NextResponse } from "next/server";
import authConfig from "@/auth.config";

const { auth } = NextAuth(authConfig);
const adminEmail = process.env.ADMIN_EMAIL?.toLowerCase();

export default auth((req) => {
  const pathname = req.nextUrl.pathname;
  const email = req.auth?.user?.email?.toLowerCase();
  const isLoggedIn = Boolean(req.auth?.user);
  const isAdmin = Boolean(adminEmail && email === adminEmail);

  if (pathname === "/admin/login") {
    if (isAdmin) {
      return NextResponse.redirect(new URL("/admin/orders", req.url));
    }

    if (isLoggedIn) {
      return NextResponse.redirect(new URL("/menu", req.url));
    }

    return NextResponse.next();
  }

  if (pathname.startsWith("/admin") && !isAdmin) {
    return NextResponse.redirect(new URL(isLoggedIn ? "/menu" : "/admin/login", req.url));
  }

  if (pathname.startsWith("/orders") && pathname !== "/orders/success" && !isLoggedIn) {
    return NextResponse.redirect(new URL("/menu", req.url));
  }

  if (pathname === "/login") {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/login", "/orders/:path*", "/admin/:path*"],
};
