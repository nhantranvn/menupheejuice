export const dynamic = "force-dynamic";

import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { LoginButton } from "@/components/auth/login-button";

export default async function AdminLoginPage() {
  const session = await auth();

  if (session?.user?.role === "ADMIN") {
    redirect("/admin/orders");
  }

  if (session?.user) {
    redirect("/menu");
  }

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-1 items-center py-10">
      <div className="grid w-full gap-6 lg:grid-cols-[1fr_0.9fr]">
        <section className="space-y-5">
          <span className="inline-flex rounded-full border border-stone-200 bg-white px-4 py-2 text-sm text-stone-600">
            Dang nhap quan tri
          </span>
          <h1 className="text-4xl font-bold leading-tight">Trang dang nhap rieng cho quan tri vien PHEE JUICE.</h1>
          <p className="text-lg leading-8 text-stone-600">
            Khach hang khong can dang nhap de dat mon. Quan tri vien dung Google de vao khu xu ly don hang, cap nhat anh mon,
            nhap menu thu cong va quet OCR tu anh menu.
          </p>
        </section>

        <section className="surface p-8">
          <p className="text-sm uppercase tracking-[0.2em] text-orange-600">Xac thuc Google</p>
          <h2 className="mt-2 text-2xl font-bold">Dang nhap khu quan tri</h2>
          <p className="mt-3 text-sm leading-6 text-stone-500">
            Chi tai khoan co quyen quan tri moi vao duoc cac trang <code>/admin</code> sau khi dang nhap thanh cong.
          </p>
          <div className="mt-6">
            <LoginButton callbackUrl="/admin/orders" />
          </div>
        </section>
      </div>
    </div>
  );
}
