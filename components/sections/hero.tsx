"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";

import { PerspectiveGrid } from "@/components/ui/perspective-grid";
import { CyberGlitchText } from "@/components/ui/cyber-glitch-text";
import { FlipFadeText } from "@/components/ui/flip-fade-text";
import AnimatedButton from "@/components/ui/animated-button";
import { EASE, fadeUp } from "@/components/motion";
import { useLang } from "@/components/lang-provider";
import { useFinePointer } from "@/lib/hooks";
import { scrollToHash } from "@/lib/utils";

export function Hero() {
  const { t, lang } = useLang();
  const finePointer = useFinePointer();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} id="home" className="relative flex min-h-[100svh] items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        {/* fewer tiles on touch devices — they can't hover them anyway */}
        <PerspectiveGrid
          key={finePointer ? "fine" : "coarse"}
          gridSize={finePointer ? 32 : 14}
          fadeRadius={70}
          className="!bg-background dark:[--fade-stop:var(--background)]"
        />
      </div>

      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="blob absolute start-[10%] top-[15%] h-56 w-56 rounded-full bg-violet-600/25 blur-[110px] md:h-72 md:w-72" />
        <div className="blob absolute bottom-[10%] end-[8%] h-64 w-64 rounded-full bg-cyan-500/20 blur-[120px] [animation-delay:-6s] md:h-80 md:w-80" />
        <div className="blob absolute start-[45%] top-[55%] hidden h-60 w-60 rounded-full bg-fuchsia-600/15 blur-[100px] [animation-delay:-12s] md:block" />
      </div>

      <motion.div
        style={{ y, opacity }}
        className="pointer-events-none relative z-10 mx-auto flex max-w-5xl flex-col items-center px-4 pt-24 text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-xs text-neutral-300 backdrop-blur-md md:mb-8"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          {t.ui.badge}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE, delay: 0.15 }}
          className="pointer-events-auto"
        >
          <CyberGlitchText
            text={t.profile.name}
            className="hero-name font-mono text-[11vw] font-black leading-none tracking-tighter text-white drop-shadow-[0_0_35px_rgba(139,92,246,0.45)] sm:text-7xl md:text-8xl lg:text-9xl"
          />
        </motion.div>

        <div className="mt-5 flex flex-wrap items-center justify-center gap-x-3 text-neutral-400 md:mt-6">
          <span className="font-mono text-sm md:text-base">{t.ui.iam}</span>
          <FlipFadeText
            key={lang}
            words={t.profile.roles}
            splitBy={lang === "ar" ? "word" : "letter"}
            interval={2600}
            className="min-h-[3rem] md:min-h-[3.5rem]"
            textClassName="text-xl sm:text-2xl md:text-4xl font-mono font-bold tracking-[0.15em] text-gradient"
            letterDuration={0.5}
            staggerDelay={0.05}
            exitStaggerDelay={0.03}
          />
        </div>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={4}
          className="mt-4 max-w-2xl text-[15px] leading-relaxed text-neutral-400 md:mt-6 md:text-lg"
        >
          {t.profile.intro}
        </motion.p>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={6}
          className="pointer-events-auto mt-8 flex flex-wrap items-center justify-center gap-3 md:mt-10 md:gap-4"
        >
          <AnimatedButton
            className="h-12 rounded-full border-white/15 bg-white/[0.03] px-8 text-white backdrop-blur-md"
            onClick={() => scrollToHash("#work")}
          >
            {t.ui.viewWork}
          </AnimatedButton>
          <button
            onClick={() => scrollToHash("#contact")}
            className="group inline-flex h-12 items-center gap-2 rounded-full bg-white px-7 text-sm font-medium text-black transition hover:bg-violet-200"
          >
            {t.ui.talk}
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 rtl:-scale-x-100" />
          </button>
        </motion.div>
      </motion.div>

      <motion.button
        onClick={() => scrollToHash("#about")}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        aria-label={t.ui.scrollAria}
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-neutral-500 [@media(max-height:760px)]:hidden"
      >
        {t.ui.scroll}
        <motion.span animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.8 }}>
          <ArrowDown className="h-4 w-4" />
        </motion.span>
      </motion.button>
    </section>
  );
}
