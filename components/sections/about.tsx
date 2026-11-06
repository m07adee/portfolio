"use client";

import { GraduationCap, Languages, Mail, MapPin } from "lucide-react";

import { Reveal } from "@/components/motion";
import { useLang } from "@/components/lang-provider";
import { SectionHeading } from "@/components/sections/section-heading";
import { shared } from "@/lib/data";
import { cn } from "@/lib/utils";

function Marquee({ items, reverse, duration }: { items: string[]; reverse?: boolean; duration: number }) {
  return (
    // tech names are always LTR, which also keeps the translate animation correct in RTL
    <div dir="ltr" className="marquee marquee-mask overflow-hidden py-2">
      <div
        className={cn("marquee-track flex w-max gap-3", reverse && "marquee-reverse")}
        style={{ ["--marquee-duration" as string]: `${duration}s` }}
      >
        {[...items, ...items].map((s, i) => (
          <span
            key={i}
            aria-hidden={i >= items.length}
            className="whitespace-nowrap rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-sm text-neutral-300 transition hover:border-violet-400/50 hover:text-white md:px-5 md:py-2"
          >
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}

export function About() {
  const { t } = useLang();
  const facts = [
    { icon: MapPin, label: t.profile.location },
    { icon: GraduationCap, label: t.profile.education },
    { icon: Languages, label: t.profile.languages },
    { icon: Mail, label: shared.email },
  ];

  return (
    <section id="about" className="relative mx-auto max-w-6xl px-4 py-20 md:py-32">
      <SectionHeading kicker={t.ui.aboutKicker} title={t.ui.aboutTitle} />

      <div className="grid gap-10 md:grid-cols-5 md:gap-12">
        <Reveal margin="-80px" className="space-y-5 text-base leading-relaxed text-neutral-400 md:col-span-3 md:text-lg">
          <p className="text-white">{t.profile.title}</p>
          {t.about.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </Reveal>

        <Reveal index={2} className="grid gap-3 sm:grid-cols-2 md:col-span-2 md:grid-cols-1 md:gap-4">
          {facts.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex min-w-0 items-center gap-4 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-4 text-sm text-neutral-300"
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-violet-500/10 text-violet-300">
                <Icon className="h-4 w-4" />
              </span>
              <span className="min-w-0 break-words">{label}</span>
            </div>
          ))}
        </Reveal>
      </div>

      <div className="mt-16 space-y-3 md:mt-20">
        <Marquee items={shared.skillRows[0]} duration={45} />
        <Marquee items={shared.skillRows[1]} reverse duration={40} />
      </div>
    </section>
  );
}
