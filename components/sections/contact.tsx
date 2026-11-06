"use client";

import { motion } from "framer-motion";
import { Mail } from "lucide-react";

import { GlowBorderCard } from "@/components/ui/glow-border-card";
import StaggerText from "@/components/ui/stagger-text";
import AnimatedButton from "@/components/ui/animated-button";
import { EASE } from "@/components/motion";
import { useLang } from "@/components/lang-provider";
import { Kicker } from "@/components/sections/section-heading";
import { shared } from "@/lib/data";

export function Contact() {
  const { t } = useLang();
  return (
    <section id="contact" className="relative mx-auto max-w-5xl px-4 py-20 md:py-32">
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 40 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, ease: EASE }}
      >
        <GlowBorderCard
          width="100%"
          height="auto"
          borderRadius="2rem"
          colorPreset="aurora"
          animationDuration={6}
          blurAmount="1.5em"
          className="!bg-[#0a0a0f]/90"
        >
          <div className="flex flex-col items-center py-10 text-center sm:px-2 md:py-20">
            <Kicker>{t.ui.contactKicker}</Kicker>
            <h2 className="max-w-3xl text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-6xl">
              <StaggerText key={t.ui.contactTitle}>{t.ui.contactTitle}</StaggerText>
            </h2>
            <p className="mt-6 max-w-xl text-neutral-400">{t.ui.contactText}</p>

            <AnimatedButton
              className="mt-8 h-auto min-h-12 max-w-full rounded-full border-white/15 bg-white/[0.04] px-5 py-3 text-sm text-white sm:px-10 md:mt-10 md:min-h-14 md:text-base"
              onClick={() => (window.location.href = `mailto:${shared.email}`)}
            >
              <Mail className="me-2 h-4 w-4 shrink-0" />
              <span dir="ltr" className="break-all">
                {shared.email}
              </span>
            </AnimatedButton>

            <div className="mt-8 flex flex-wrap justify-center gap-6 md:mt-10">
              {t.profile.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group relative text-sm text-neutral-400 transition hover:text-white"
                >
                  {s.label}
                  <span className="absolute -bottom-1 start-0 h-px w-0 bg-gradient-to-r from-violet-400 to-cyan-400 transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </div>
          </div>
        </GlowBorderCard>
      </motion.div>
    </section>
  );
}
