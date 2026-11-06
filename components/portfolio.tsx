"use client";

import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion";
import { ArrowDown, ArrowUpRight, Globe, GraduationCap, Languages, Mail, MapPin } from "lucide-react";

import { SpotlightNavbar } from "@/components/ui/spotlight-navbar";
import { PerspectiveGrid } from "@/components/ui/perspective-grid";
import { CyberGlitchText } from "@/components/ui/cyber-glitch-text";
import { FlipFadeText } from "@/components/ui/flip-fade-text";
import StaggerText from "@/components/ui/stagger-text";
import StatsCounter from "@/components/ui/stats-counter";
import { GlowBorderCard } from "@/components/ui/glow-border-card";
import { BorderBeam } from "@/components/ui/border-beam";
import AnimatedButton from "@/components/ui/animated-button";
import { SmoothScroll } from "@/components/ui/smooth-scroll";
import { cn } from "@/lib/utils";
import { content, shared, type Content, type Lang } from "@/lib/data";

type LangCtx = { lang: Lang; t: Content; toggle: () => void };
const LangContext = createContext<LangCtx>({ lang: "en", t: content.en, toggle: () => {} });
const useLang = () => useContext(LangContext);

const EASE = [0.22, 1, 0.36, 1] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40, filter: "blur(8px)" },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: EASE, delay: i * 0.1 },
  }),
};

function scrollToHash(href: string) {
  const el = document.querySelector(href) as HTMLElement | null;
  if (!el) return;
  if (window.__lenis) window.__lenis.scrollTo(el, { offset: -20, duration: 1.4 });
  else el.scrollIntoView({ behavior: "smooth" });
}

/* ------------------------------------------------------------------ */

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[70] h-[2px] origin-left bg-gradient-to-r from-violet-500 via-fuchsia-400 to-cyan-400"
    />
  );
}

function CursorGlow() {
  const x = useMotionValue(-500);
  const y = useMotionValue(-500);
  const sx = useSpring(x, { stiffness: 80, damping: 20 });
  const sy = useSpring(y, { stiffness: 80, damping: 20 });
  const bg = useMotionTemplate`radial-gradient(500px circle at ${sx}px ${sy}px, rgba(139,92,246,0.10), transparent 60%)`;

  React.useEffect(() => {
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, [x, y]);

  return <motion.div aria-hidden style={{ background: bg }} className="pointer-events-none fixed inset-0 z-30" />;
}

function SectionHeading({ kicker, title, className }: { kicker: string; title: string; className?: string }) {
  return (
    <div className={cn("mb-14", className)}>
      <motion.p
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="mb-4 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.3em] text-violet-300/80"
      >
        <span className="h-px w-8 bg-violet-400/60" />
        {kicker}
      </motion.p>
      <h2 className="text-4xl font-semibold tracking-tight text-white md:text-6xl">
        <StaggerText key={title}>{title}</StaggerText>
      </h2>
    </div>
  );
}

/* ------------------------------------------------------------------ */

function Hero() {
  const { t, lang } = useLang();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} id="home" className="relative flex min-h-[100svh] items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <PerspectiveGrid gridSize={32} fadeRadius={70} className="!bg-[#050507] [--fade-stop:#050507]" />
      </div>

      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="blob absolute left-[10%] top-[15%] h-72 w-72 rounded-full bg-violet-600/25 blur-[110px]" />
        <div className="blob absolute bottom-[10%] right-[8%] h-80 w-80 rounded-full bg-cyan-500/20 blur-[120px] [animation-delay:-6s]" />
        <div className="blob absolute left-[45%] top-[55%] h-60 w-60 rounded-full bg-fuchsia-600/15 blur-[100px] [animation-delay:-12s]" />
      </div>

      <motion.div
        style={{ y, opacity }}
        className="pointer-events-none relative z-10 mx-auto flex max-w-5xl flex-col items-center px-4 pt-24 text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-xs text-neutral-300 backdrop-blur-md"
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

        <div className="mt-6 flex items-center gap-3 text-neutral-400">
          <span className="font-mono text-sm md:text-base">{t.ui.iam}</span>
          <FlipFadeText
            key={lang}
            words={t.profile.roles}
            splitBy={lang === "ar" ? "word" : "letter"}
            interval={2600}
            className="min-h-[3rem] md:min-h-[3.5rem]"
            textClassName="text-2xl md:text-4xl font-mono font-bold tracking-[0.15em] text-gradient"
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
          className="mt-6 max-w-2xl text-base leading-relaxed text-neutral-400 md:text-lg"
        >
          {t.profile.intro}
        </motion.p>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={6}
          className="pointer-events-auto mt-10 flex flex-wrap items-center justify-center gap-4"
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
            <ArrowUpRight className="h-4 w-4 rtl:-scale-x-100 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </button>
        </motion.div>
      </motion.div>

      <motion.button
        onClick={() => scrollToHash("#about")}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        aria-label={t.ui.scrollAria}
        className="absolute bottom-8 left-1/2 z-10 flex [@media(max-height:760px)]:hidden -translate-x-1/2 flex-col items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-neutral-500"
      >
        {t.ui.scroll}
        <motion.span animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.8 }}>
          <ArrowDown className="h-4 w-4" />
        </motion.span>
      </motion.button>
    </section>
  );
}

function Stats() {
  const { t } = useLang();
  return (
    <section className="relative border-y border-white/[0.06] bg-white/[0.015]">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-y-10 px-4 py-14 md:grid-cols-4">
        {shared.statValues.map((s, i) => (
          <motion.div
            key={i}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            custom={i}
            className="text-center"
          >
            <div className="text-4xl font-semibold text-white md:text-5xl">
              <StatsCounter value={s.value} suffix={s.suffix} duration={2} />
            </div>
            <p className="mt-2 text-xs uppercase tracking-[0.2em] text-neutral-500">{t.statLabels[i]}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Marquee({ items, reverse, duration = 40 }: { items: string[]; reverse?: boolean; duration?: number }) {
  return (
    <div dir="ltr" className="marquee marquee-mask overflow-hidden py-2">
      <div
        className={cn("marquee-track flex w-max gap-3", reverse && "marquee-reverse")}
        style={{ ["--marquee-duration" as string]: `${duration}s` }}
      >
        {[...items, ...items].map((s, i) => (
          <span
            key={i}
            className="whitespace-nowrap rounded-full border border-white/10 bg-white/[0.03] px-5 py-2 text-sm text-neutral-300 transition hover:border-violet-400/50 hover:text-white"
          >
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}

function About() {
  const { t } = useLang();
  return (
    <section id="about" className="relative mx-auto max-w-6xl px-4 py-28 md:py-36">
      <SectionHeading kicker={t.ui.aboutKicker} title={t.ui.aboutTitle} />
      <div className="grid gap-12 md:grid-cols-5">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="space-y-5 text-lg leading-relaxed text-neutral-400 md:col-span-3"
        >
          <p className="text-white">{t.profile.title}</p>
          {t.about.map((t) => (
            <p key={t}>{t}</p>
          ))}
        </motion.div>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          custom={2}
          className="space-y-4 md:col-span-2"
        >
          {[
            { icon: MapPin, label: t.profile.location },
            { icon: GraduationCap, label: t.profile.education },
            { icon: Languages, label: t.profile.languages },
            { icon: Mail, label: shared.email },
          ].map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-4 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-4 text-sm text-neutral-300"
            >
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-violet-500/10 text-violet-300">
                <Icon className="h-4 w-4" />
              </span>
              {label}
            </div>
          ))}
        </motion.div>
      </div>

      <div className="mt-20 space-y-3">
        <Marquee items={shared.skillRows[0]} duration={45} />
        <Marquee items={shared.skillRows[1]} reverse duration={40} />
      </div>
    </section>
  );
}

type Project = Content["projects"][number] & (typeof shared.projectMeta)[number];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const { t } = useLang();
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(my, [0, 1], [7, -7]), { stiffness: 150, damping: 18 });
  const rotateY = useSpring(useTransform(mx, [0, 1], [-7, 7]), { stiffness: 150, damping: 18 });
  const glowX = useTransform(mx, (v) => `${v * 100}%`);
  const glowY = useTransform(my, (v) => `${v * 100}%`);
  const glow = useMotionTemplate`radial-gradient(400px circle at ${glowX} ${glowY}, rgba(255,255,255,0.08), transparent 60%)`;

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      custom={index % 2}
      style={{ perspective: 1200 }}
    >
      <motion.div
        ref={ref}
        onPointerMove={(e) => {
          const r = ref.current!.getBoundingClientRect();
          mx.set((e.clientX - r.left) / r.width);
          my.set((e.clientY - r.top) / r.height);
        }}
        onPointerLeave={() => {
          mx.set(0.5);
          my.set(0.5);
        }}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="group relative h-full overflow-hidden rounded-3xl border border-white/[0.08] bg-neutral-950/80 p-8"
      >
        {project.href && (
          <a
            href={project.href}
            target="_blank"
            rel="noreferrer"
            aria-label={`${project.title} ${t.ui.onGithub}`}
            className="absolute inset-0 z-20"
          />
        )}
        <div className={cn("pointer-events-none absolute -end-20 -top-20 h-72 w-72 rounded-full bg-gradient-to-br blur-3xl transition-opacity duration-500 group-hover:opacity-100 opacity-60", project.gradient)} />
        <motion.div aria-hidden style={{ background: glow }} className="pointer-events-none absolute inset-0" />
        <BorderBeam size={220} duration={10 + index * 2} delay={index * 1.5} colorFrom="#a78bfa" colorTo="#22d3ee" />

        <div className="relative flex h-full flex-col" style={{ transform: "translateZ(40px)" }}>
          <div className="mb-16 flex items-start justify-between">
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-neutral-500">
              {String(index + 1).padStart(2, "0")} / {project.tag}
            </span>
            <span className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-neutral-400 transition-all duration-300 group-hover:rotate-45 group-hover:border-white/30 group-hover:bg-white group-hover:text-black">
              <ArrowUpRight className="h-4 w-4 rtl:-scale-x-100" />
            </span>
          </div>
          <h3 className="text-3xl font-semibold tracking-tight text-white">{project.title}</h3>
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
    </motion.div>
  );
}

function Work() {
  const { t } = useLang();
  return (
    <section id="work" className="relative mx-auto max-w-6xl px-4 py-28 md:py-36">
      <SectionHeading kicker={t.ui.workKicker} title={t.ui.workTitle} />
      <div className="grid gap-6 md:grid-cols-2">
        {t.projects.map((p, i) => (
          <ProjectCard key={p.title} project={{ ...p, ...shared.projectMeta[i] }} index={i} />
        ))}
      </div>
    </section>
  );
}

function Journey() {
  const { t, lang } = useLang();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 60%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 25 });

  return (
    <section id="journey" className="relative mx-auto max-w-4xl px-4 py-28 md:py-36">
      <SectionHeading kicker={t.ui.journeyKicker} title={t.ui.journeyTitle} />
      <div ref={ref} className="relative ps-10">
        <div className="absolute bottom-0 start-[7px] top-0 w-px bg-white/10" />
        <motion.div
          style={{ scaleY }}
          className="absolute bottom-0 start-[7px] top-0 w-px origin-top bg-gradient-to-b from-violet-400 via-fuchsia-400 to-cyan-400"
        />
        <div className="space-y-14">
          {t.journey.map((j, i) => (
            <motion.div
              key={j.title}
              initial={{ opacity: 0, x: lang === "ar" ? 30 : -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: EASE, delay: i * 0.05 }}
              className="relative"
            >
              <span className="absolute -start-10 top-1.5 grid h-4 w-4 place-items-center rounded-full border border-violet-400/60 bg-[#050507]">
                <span className="h-1.5 w-1.5 rounded-full bg-violet-300 shadow-[0_0_12px_rgba(167,139,250,0.9)]" />
              </span>
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-violet-300/80">{j.period}</p>
              <h3 className="mt-2 text-2xl font-semibold text-white">{j.title}</h3>
              <p className="text-sm text-neutral-500">{j.place}</p>
              <p className="mt-3 max-w-xl leading-relaxed text-neutral-400">{j.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const { t } = useLang();
  return (
    <section id="contact" className="relative mx-auto max-w-5xl px-4 py-28 md:py-36">
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
          <div className="flex flex-col items-center px-2 py-14 text-center md:py-20">
            <p className="mb-5 font-mono text-xs uppercase tracking-[0.3em] text-violet-300/80">{t.ui.contactKicker}</p>
            <h2 className="max-w-3xl text-4xl font-semibold tracking-tight text-white md:text-6xl">
              <StaggerText key={t.ui.contactTitle}>{t.ui.contactTitle}</StaggerText>
            </h2>
            <p className="mt-6 max-w-xl text-neutral-400">
              {t.ui.contactText}
            </p>
            <AnimatedButton
              className="mt-10 h-14 rounded-full border-white/15 bg-white/[0.04] px-10 text-base text-white"
              onClick={() => (window.location.href = `mailto:${shared.email}`)}
            >
              <Mail className="me-2 h-4 w-4" /> <span dir="ltr">{shared.email}</span>
            </AnimatedButton>
            <div className="mt-10 flex flex-wrap justify-center gap-6">
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

function Footer() {
  const { t } = useLang();
  return (
    <footer className="relative overflow-hidden border-t border-white/[0.06]">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 text-xs text-neutral-500 md:flex-row">
        <p>© {new Date().getFullYear()} {t.profile.fullName}. {t.ui.rights}</p>
        <p>
          {t.ui.builtWith} <span className="text-neutral-300">VengeanceUI</span>
        </p>
      </div>
      <p
        aria-hidden
        className="pointer-events-none select-none text-center font-mono text-[18vw] font-black leading-[0.8] tracking-tighter text-white/[0.03]"
      >
        {t.profile.shortName}
      </p>
    </footer>
  );
}

/* ------------------------------------------------------------------ */

function LangToggle({ className }: { className?: string }) {
  const { t, toggle } = useLang();
  return (
    <button
      onClick={toggle}
      aria-label={t.ui.switchAria}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/60 px-3 py-1.5 text-xs font-medium text-neutral-200 backdrop-blur-xl transition hover:border-violet-400/60 hover:text-white",
        className,
      )}
    >
      <Globe className="h-3.5 w-3.5" />
      {t.ui.switchTo}
    </button>
  );
}

function Shell() {
  const { t, lang } = useLang();
  return (
    <SmoothScroll>
      <ScrollProgress />
      <CursorGlow />
      <header className="fixed inset-x-0 top-0 z-50 hidden justify-center sm:flex">
        <SpotlightNavbar key={lang} items={t.nav} className="pt-5" onItemClick={(item) => scrollToHash(item.href)} />
        <LangToggle className="absolute end-6 top-7" />
      </header>
      <header className="fixed inset-x-3 top-3 z-50 flex items-center justify-between gap-2 rounded-full border border-white/10 bg-black/60 py-2 pe-2 ps-4 backdrop-blur-xl sm:hidden">
        <button onClick={() => scrollToHash("#home")} className="shrink-0 font-mono text-sm font-bold text-white">
          {t.profile.shortName}
        </button>
        <nav className="flex items-center gap-3 text-xs text-neutral-400">
          {t.nav.slice(1).map((n) => (
            <button key={n.href} onClick={() => scrollToHash(n.href)} className="hover:text-white">
              {n.label}
            </button>
          ))}
          <LangToggle className="px-2 py-1" />
        </nav>
      </header>
      <main className="relative">
        <Hero />
        <Stats />
        <About />
        <Work />
        <Journey />
        <Contact />
      </main>
      <Footer />
    </SmoothScroll>
  );
}

export default function Portfolio() {
  const [lang, setLang] = useState<Lang>("en");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("lang");
      if (saved === "ar" || saved === "en") setLang(saved);
      else if (navigator.language?.toLowerCase().startsWith("ar")) setLang("ar");
    } catch {}
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    try {
      localStorage.setItem("lang", lang);
    } catch {}
  }, [lang]);

  const value: LangCtx = { lang, t: content[lang], toggle: () => setLang((l) => (l === "en" ? "ar" : "en")) };

  return (
    <LangContext.Provider value={value}>
      <Shell />
    </LangContext.Provider>
  );
}
