"use client";

import { useLang } from "@/components/lang-provider";

export function Footer() {
  const { t } = useLang();
  return (
    <footer className="relative overflow-hidden border-t border-white/[0.06]">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-8 text-center text-xs text-neutral-500 md:flex-row">
        <p>
          © {new Date().getFullYear()} {t.profile.fullName}. {t.ui.rights}
        </p>
        <p>
          {t.ui.builtWith} <span className="text-neutral-300">VengeanceUI</span>
        </p>
      </div>
      <p
        aria-hidden
        className="pointer-events-none select-none whitespace-nowrap text-center font-mono text-[18vw] font-black leading-[0.8] tracking-tighter text-white/[0.03]"
      >
        {t.profile.shortName}
      </p>
    </footer>
  );
}
