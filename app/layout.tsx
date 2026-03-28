import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/components/cart/cart-provider";
import { Navbar } from "@/components/layout/navbar";

export const metadata: Metadata = {
  title: "Bếp Nhà Mình",
  description: "MVP web đặt món cho quán ăn với Next.js 14, Prisma và Auth.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className="min-h-screen bg-stone-50 text-stone-900 antialiased">
        <CartProvider>
          <div className="relative min-h-screen overflow-hidden">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-[460px] bg-[radial-gradient(circle_at_top,_rgba(251,191,36,0.24),_transparent_56%),linear-gradient(180deg,_rgba(255,255,255,0.92),_rgba(248,250,252,0.96))]" />
            <div className="relative">
              <Navbar />
              <main className="mx-auto flex min-h-[calc(100vh-80px)] w-full max-w-7xl flex-col px-4 pb-12 pt-6 sm:px-6 lg:px-8">
                {children}
              </main>
            </div>
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
