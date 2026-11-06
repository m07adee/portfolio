"use client";

import StaggerText from "@/components/ui/stagger-text";
import { Reveal } from "@/components/motion";

export function Kicker({ children }: { children: string }) {
  return (
    <p className="mb-4 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.3em] text-violet-300/80">
      <span className="h-px w-8 bg-violet-400/60" />
      {children}
    </p>
  );
}

export function SectionHeading({ kicker, title }: { kicker: string; title: string }) {
  return (
    <div className="mb-10 md:mb-14">
      <Reveal>
        <Kicker>{kicker}</Kicker>
      </Reveal>
      <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-6xl">
        {/* key re-runs the reveal when the language changes */}
        <StaggerText key={title}>{title}</StaggerText>
      </h2>
    </div>
  );
}
