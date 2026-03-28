import { NextResponse } from "next/server";
import { auth } from "@/auth";

export default auth((req) => {
  const pathname = req.nextUrl.pathname;
  const role = req.auth?.user?.role;
  const isLoggedIn = Boolean(req.auth?.user);

  if (pathname === "/admin/login") {
    if (role === "ADMIN") {
      return NextResponse.redirect(new URL("/admin/orders", req.url));
    }

    if (isLoggedIn) {
      return NextResponse.redirect(new URL("/menu", req.url));
    }

    return NextResponse.next();
  }

  if (pathname.startsWith("/admin") && role !== "ADMIN") {
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
