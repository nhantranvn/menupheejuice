import type { Metadata } from "next";
import "./globals.css";
import { NavbarClient } from "@/components/layout/navbar-client";
import { AppProviders } from "@/components/providers/app-providers";

export const metadata: Metadata = {
  title: "Phee Juice Trần Cung",
  description: "Đặt món trực tuyến cho Phee Juice Trần Cung với Next.js 14, Prisma và Auth.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className="min-h-screen bg-stone-50 text-stone-900 antialiased">
        <AppProviders>
          <div className="relative min-h-screen overflow-hidden">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-[460px] bg-[radial-gradient(circle_at_top,_rgba(251,191,36,0.24),_transparent_56%),linear-gradient(180deg,_rgba(255,255,255,0.92),_rgba(248,250,252,0.96))]" />
            <div className="relative">
              <NavbarClient />
              <main className="mx-auto flex min-h-[calc(100vh-80px)] w-full max-w-7xl flex-col px-4 pb-12 pt-6 sm:px-6 lg:px-8">
                {children}
              </main>
            </div>
          </div>
        </AppProviders>
      </body>
    </html>
  );
}
