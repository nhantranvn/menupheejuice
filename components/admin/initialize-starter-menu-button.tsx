"use client";

import { useState, useTransition } from "react";
import { WandSparkles } from "lucide-react";
import { initializeStarterMenuAction } from "@/lib/actions/menu-items";

export function InitializeStarterMenuButton() {
  const [message, setMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  return (
    <section className="surface p-6 sm:p-8">
      <p className="text-sm uppercase tracking-[0.2em] text-orange-600">Khoi tao du lieu</p>
      <h2 className="mt-2 text-2xl font-bold">Menu production dang trong</h2>
      <p className="mt-3 max-w-3xl text-stone-600">
        Ban co the tao nhanh menu mac dinh de hien thi ngoai trang khach hang, sau do tiep tuc cap nhat ten mon, anh that va trang thai phuc vu.
      </p>
      <div className="mt-6 flex flex-wrap items-center gap-3">
        <button
          type="button"
          className="button-primary"
          disabled={isPending}
          onClick={() => {
            setMessage(null);
            startTransition(async () => {
              const result = await initializeStarterMenuAction();
              setMessage(result.ok ? result.message ?? "Da khoi tao menu mac dinh." : result.error ?? "Khong the khoi tao menu luc nay.");
            });
          }}
        >
          <WandSparkles className="mr-2 h-4 w-4" />
          {isPending ? "Dang khoi tao..." : "Khoi tao menu mac dinh"}
        </button>
        <p className="text-sm text-stone-500">Chi nen dung khi database production dang trong va ban muon co san du lieu de sua nhanh.</p>
      </div>
      {message ? <p className="mt-4 rounded-2xl bg-stone-50 px-4 py-3 text-sm text-stone-600">{message}</p> : null}
    </section>
  );
}
