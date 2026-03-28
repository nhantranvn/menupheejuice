import Link from "next/link";
import { auth } from "@/auth";

export default async function OrderSuccessPage({
  searchParams,
}: {
  searchParams: {
    orderCode?: string;
  };
}) {
  const session = await auth();

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-1 items-center py-10">
      <section className="surface w-full p-8 text-center sm:p-10">
        <span className="inline-flex rounded-full bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700">Đặt món thành công</span>
        <h1 className="mt-5 text-4xl font-bold">Quán đã nhận được đơn hàng của bạn.</h1>
        <p className="mt-4 text-lg leading-8 text-stone-600">
          Mã đơn của bạn là <span className="font-semibold text-stone-950">{searchParams.orderCode ? `#${searchParams.orderCode}` : "đang được tạo"}</span>.
          Hãy lưu lại mã này để quán hỗ trợ tra cứu nhanh. Nếu bạn đã đăng nhập trước đó, đơn cũng sẽ xuất hiện trong mục đơn của tôi.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/menu" className="button-primary">
            Đặt thêm món
          </Link>
          {session?.user ? (
            <Link href="/orders" className="button-secondary">
              Xem đơn của tôi
            </Link>
          ) : (
            <Link href="/cart" className="button-secondary">
              Quay lại giỏ hàng
            </Link>
          )}
        </div>
      </section>
    </div>
  );
}
