export const dynamic = "force-dynamic";

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
        <p className="text-sm uppercase tracking-[0.2em] text-orange-600">Nhap menu tu anh</p>
        <div className="mt-3 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-4xl font-bold">Tai anh menu, quet OCR va cap nhat thuc don</h1>
            <p className="mt-3 max-w-3xl text-stone-600">
              Ban co the tai anh menu cua quan len, he thong se quet chu de tao noi dung OCR cho ban ra soat.
              Sau do ban co the chinh lai noi dung roi nhap cac mon hop le vao danh sach thuc don.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link href="/admin/menu-items" className="button-secondary">
              Quan ly anh mon
            </Link>
            <Link href="/admin/orders" className="button-secondary">
              Quay lai quan tri don
            </Link>
          </div>
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <MenuImportUploadForm />

        <section className="surface p-6 sm:p-8">
          <p className="text-sm uppercase tracking-[0.2em] text-orange-600">Phien quet gan day</p>
          <h2 className="mt-2 text-2xl font-bold">Ra soat va nhap vao thuc don</h2>

          {jobs.length === 0 ? (
            <div className="mt-6 rounded-3xl border border-dashed border-stone-300 bg-stone-50 p-8 text-center">
              <p className="text-lg font-semibold">Chua co phien quet nao.</p>
              <p className="mt-2 text-stone-500">Tai mot anh menu de bat dau quet, ra soat va nhap menu.</p>
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
