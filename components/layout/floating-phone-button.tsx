import { PhoneCall } from "lucide-react";

const PHONE_NUMBER = "0984339499";
const PHONE_LABEL = "0984 339 499";

export function FloatingPhoneButton() {
  return (
    <a
      href={`tel:${PHONE_NUMBER}`}
      aria-label={`Gọi ${PHONE_LABEL}`}
      className="fixed bottom-24 right-4 z-50 inline-flex items-center gap-3 rounded-full bg-emerald-500 px-4 py-3 text-sm font-semibold text-white shadow-[0_18px_40px_-18px_rgba(16,185,129,0.8)] transition hover:bg-emerald-600 focus:outline-none focus:ring-4 focus:ring-emerald-200 md:bottom-6 md:right-6"
    >
      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/16">
        <PhoneCall className="h-5 w-5" />
      </span>
      <span className="hidden sm:inline">Gọi ngay {PHONE_LABEL}</span>
      <span className="sm:hidden">Gọi</span>
    </a>
  );
}
