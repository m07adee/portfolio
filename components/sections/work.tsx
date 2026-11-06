"use client";

import { useRef } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import { BorderBeam } from "@/components/ui/border-beam";
import { Reveal } from "@/components/motion";
import { useLang } from "@/components/lang-provider";
import { SectionHeading } from "@/components/sections/section-heading";
import { shared, type ProjectText } from "@/lib/data";
import { useFinePointer } from "@/lib/hooks";
import { cn } from "@/lib/utils";

type Project = ProjectText & (typeof shared.projectMeta)[number];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const { t } = useLang();
  const tilt = useFinePointer();
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(my, [0, 1], [7, -7]), { stiffness: 150, damping: 18 });
  const rotateY = useSpring(useTransform(mx, [0, 1], [-7, 7]), { stiffness: 150, damping: 18 });
  const glowX = useTransform(mx, (v) => `${v * 100}%`);
  const glowY = useTransform(my, (v) => `${v * 100}%`);
  const glow = useMotionTemplate`radial-gradient(400px circle at ${glowX} ${glowY}, rgba(255,255,255,0.08), transparent 60%)`;

  const onMove = (e: React.PointerEvent) => {
    const r = ref.current!.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  };
  const onLeave = () => {
    mx.set(0.5);
    my.set(0.5);
  };

  return (
    <Reveal index={index % 2} style={{ perspective: 1200 }}>
      <motion.div
        ref={ref}
        onPointerMove={tilt ? onMove : undefined}
        onPointerLeave={tilt ? onLeave : undefined}
        style={tilt ? { rotateX, rotateY, transformStyle: "preserve-3d" } : undefined}
        className="group relative h-full overflow-hidden rounded-3xl border border-white/[0.08] bg-neutral-950/80 p-6 md:p-8"
      >
        <a
          href={project.href}
          target="_blank"
          rel="noreferrer"
          aria-label={`${project.title} ${t.ui.onGithub}`}
          className="absolute inset-0 z-20 rounded-3xl focus-visible:outline-2 focus-visible:outline-violet-400"
        />
        <div
          className={cn(
            "pointer-events-none absolute -end-20 -top-20 h-72 w-72 rounded-full bg-gradient-to-br opacity-60 blur-3xl transition-opacity duration-500 group-hover:opacity-100",
            project.gradient,
          )}
        />
        {tilt && <motion.div aria-hidden style={{ background: glow }} className="pointer-events-none absolute inset-0" />}
        <BorderBeam size={220} duration={10 + index * 2} delay={index * 1.5} colorFrom="#a78bfa" colorTo="#22d3ee" />

        <div className="relative flex h-full flex-col" style={tilt ? { transform: "translateZ(40px)" } : undefined}>
          <div className="mb-10 flex items-start justify-between gap-4 md:mb-16">
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-neutral-500">
              {String(index + 1).padStart(2, "0")} / {project.tag}
            </span>
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/10 text-neutral-400 transition-all duration-300 group-hover:rotate-45 group-hover:border-white/30 group-hover:bg-white group-hover:text-black">
              <ArrowUpRight className="h-4 w-4 rtl:-scale-x-100" />
            </span>
          </div>
          <h3 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">{project.title}</h3>
          <p className="mt-3 leading-relaxed text-neutral-400">{project.description}</p>
          <ul className="mt-5 space-y-2 text-sm text-neutral-400">
            {project.highlights.map((h) => (
              <li key={h} className="flex gap-2">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-violet-300" />
                {h}
              </li>
            ))}
          </ul>
          <div className="mt-auto flex flex-wrap gap-2 pt-8">
            {project.stack.map((s) => (
              <span key={s} className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-neutral-300">
                {s}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </Reveal>
  );
}

export function Work() {
  const { t } = useLang();
  return (
    <section id="work" className="relative mx-auto max-w-6xl px-4 py-20 md:py-32">
      <SectionHeading kicker={t.ui.workKicker} title={t.ui.workTitle} />
      <div className="grid gap-5 md:grid-cols-2 md:gap-6">
        {t.projects.map((p, i) => (
          <ProjectCard key={p.title} project={{ ...p, ...shared.projectMeta[i] }} index={i} />
        ))}
      </div>
    </section>
  );
}
