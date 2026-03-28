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
            Đăng nhập quản trị
          </span>
          <h1 className="text-4xl font-bold leading-tight">Trang đăng nhập riêng cho quản trị viên PHEE JUICE.</h1>
          <p className="text-lg leading-8 text-stone-600">
            Khách hàng không cần đăng nhập để đặt món. Quản trị viên dùng Google để vào khu xử lý đơn hàng, cập nhật ảnh món,
            nhập menu thủ công và quét OCR từ ảnh menu.
          </p>
        </section>

        <section className="surface p-8">
          <p className="text-sm uppercase tracking-[0.2em] text-orange-600">Xác thực Google</p>
          <h2 className="mt-2 text-2xl font-bold">Đăng nhập khu quản trị</h2>
          <p className="mt-3 text-sm leading-6 text-stone-500">
            Chỉ tài khoản có quyền quản trị mới vào được các trang <code>/admin</code> sau khi đăng nhập thành công.
          </p>
          <div className="mt-6">
            <LoginButton callbackUrl="/admin/orders" />
          </div>
        </section>
      </div>
    </div>
  );
}
