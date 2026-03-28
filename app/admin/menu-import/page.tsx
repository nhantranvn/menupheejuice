export const dynamic = "force-dynamic";

import { redirect } from "next/navigation";

export default function AdminMenuImportPage() {
  redirect("/admin/menu-items");
}
