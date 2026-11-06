"use client";

import StatsCounter from "@/components/ui/stats-counter";
import { Reveal } from "@/components/motion";
import { useLang } from "@/components/lang-provider";
import { shared } from "@/lib/data";

export function Stats() {
  const { t } = useLang();
  return (
    <section className="relative border-y border-white/[0.06] bg-white/[0.015]">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-x-4 gap-y-10 px-4 py-12 md:grid-cols-4 md:py-14">
        {shared.statValues.map((s, i) => (
          <Reveal key={i} index={i} margin="0px" className="text-center">
            <div className="text-3xl font-semibold text-white sm:text-4xl md:text-5xl">
              <StatsCounter value={s.value} suffix={s.suffix} duration={2} />
            </div>
            <p className="mt-2 text-[11px] uppercase tracking-[0.2em] text-neutral-500 sm:text-xs">{t.statLabels[i]}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
