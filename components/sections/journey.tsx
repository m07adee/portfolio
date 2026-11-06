"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

import { EASE } from "@/components/motion";
import { useLang } from "@/components/lang-provider";
import { SectionHeading } from "@/components/sections/section-heading";

export function Journey() {
  const { t, lang } = useLang();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 60%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 25 });

  return (
    <section id="journey" className="relative mx-auto max-w-4xl px-4 py-20 md:py-32">
      <SectionHeading kicker={t.ui.journeyKicker} title={t.ui.journeyTitle} />

      <div ref={ref} className="relative ps-9 md:ps-10">
        <div className="absolute bottom-0 start-[7px] top-0 w-px bg-white/10" />
        <motion.div
          style={{ scaleY }}
          className="absolute bottom-0 start-[7px] top-0 w-px origin-top bg-gradient-to-b from-violet-400 via-fuchsia-400 to-cyan-400"
        />

        <div className="space-y-12 md:space-y-14">
          {t.journey.map((j, i) => (
            <motion.div
              key={j.title}
              initial={{ opacity: 0, x: lang === "ar" ? 30 : -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: EASE, delay: i * 0.05 }}
              className="relative"
            >
              <span className="absolute -start-9 top-1.5 grid h-4 w-4 place-items-center rounded-full border border-violet-400/60 bg-background md:-start-10">
                <span className="h-1.5 w-1.5 rounded-full bg-violet-300 shadow-[0_0_12px_rgba(167,139,250,0.9)]" />
              </span>
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-violet-300/80">{j.period}</p>
              <h3 className="mt-2 text-xl font-semibold text-white md:text-2xl">{j.title}</h3>
              <p className="text-sm text-neutral-500">{j.place}</p>
              <p className="mt-3 max-w-xl leading-relaxed text-neutral-400">{j.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
