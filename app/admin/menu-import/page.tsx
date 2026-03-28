import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { MenuImportAutoRefresh } from "@/components/admin/menu-import-auto-refresh";
import { MenuImportJobCard } from "@/components/admin/menu-import-job-card";
import { MenuImportUploadForm } from "@/components/admin/menu-import-upload-form";
import { prisma } from "@/lib/prisma";

export default async function AdminMenuImportPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/admin/login");
  }

  if (session.user.role !== "ADMIN") {
    redirect("/menu");
  }

  const jobs = await prisma.menuImportJob.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      user: {
        select: {
          name: true,
          email: true,
        },
      },
    },
  });

  const hasPendingJob = jobs.some((job) => job.status === "OCR_PENDING" || job.status === "UPLOADED");

  return (
    <div className="space-y-6 py-4">
      <MenuImportAutoRefresh enabled={hasPendingJob} />

      <section className="surface p-6 sm:p-8">
        <p className="text-sm uppercase tracking-[0.2em] text-orange-600">Nhập menu từ ảnh</p>
        <div className="mt-3 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-4xl font-bold">Tải ảnh menu, quét OCR và cập nhật thực đơn</h1>
            <p className="mt-3 max-w-3xl text-stone-600">
              Bạn có thể tải ảnh menu của quán lên, hệ thống sẽ quét chữ để tạo nội dung OCR cho bạn rà soát.
              Sau đó bạn có thể chỉnh lại nội dung rồi nhập các món hợp lệ vào danh sách thực đơn.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link href="/admin/menu-items" className="button-secondary">
              Quản lý ảnh món
            </Link>
            <Link href="/admin/orders" className="button-secondary">
              Quay lại quản trị đơn
            </Link>
          </div>
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <MenuImportUploadForm />

        <section className="surface p-6 sm:p-8">
          <p className="text-sm uppercase tracking-[0.2em] text-orange-600">Phiên quét gần đây</p>
          <h2 className="mt-2 text-2xl font-bold">Rà soát và nhập vào thực đơn</h2>

          {jobs.length === 0 ? (
            <div className="mt-6 rounded-3xl border border-dashed border-stone-300 bg-stone-50 p-8 text-center">
              <p className="text-lg font-semibold">Chưa có phiên quét nào.</p>
              <p className="mt-2 text-stone-500">Tải một ảnh menu để bắt đầu quét, rà soát và nhập menu.</p>
            </div>
          ) : (
            <div className="mt-6 space-y-4">
              {jobs.map((job) => (
                <MenuImportJobCard key={job.id} job={job} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
