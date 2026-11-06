"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Globe, Menu, X } from "lucide-react";

import { useLang } from "@/components/lang-provider";
import { useActiveSection } from "@/lib/hooks";
import { cn, scrollToHash } from "@/lib/utils";

type Ripple = { id: number; x: number; y: number; size: number; strong: boolean };

const RING_SPRING = { type: "spring", stiffness: 380, damping: 30 } as const;
const LIQUID_SPRING = { type: "spring", stiffness: 260, damping: 24, mass: 0.8 } as const;

/** SVG filter that turns a flat blob into a wobbling "water" surface. */
function LiquidFilter() {
  return (
    <svg aria-hidden width="0" height="0" className="absolute">
      <filter id="liquid-nav" x="-25%" y="-60%" width="150%" height="220%">
        <feTurbulence type="fractalNoise" baseFrequency="0.012 0.06" numOctaves="2" seed="4" result="noise">
          <animate
            attributeName="baseFrequency"
            dur="6s"
            values="0.012 0.06;0.02 0.09;0.012 0.06"
            repeatCount="indefinite"
          />
        </feTurbulence>
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="9" xChannelSelector="R" yChannelSelector="G" />
      </filter>
    </svg>
  );
}

/** Expanding water rings spawned at the pointer. */
function useRipples() {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const last = useRef(0);
  const nextId = useRef(0);

  const spawn = (e: React.PointerEvent | React.MouseEvent, strong = false) => {
    const now = performance.now();
    if (!strong && now - last.current < 140) return; // throttle the hover trail
    last.current = now;
    const r = e.currentTarget.getBoundingClientRect();
    const size = Math.max(r.width, r.height) * (strong ? 2.6 : 1.4);
    const id = nextId.current++;
    setRipples((list) => [...list.slice(-6), { id, x: e.clientX - r.left, y: e.clientY - r.top, size, strong }]);
  };
  const remove = (id: number) => setRipples((list) => list.filter((r) => r.id !== id));

  return { ripples, spawn, remove };
}

function NavLink({
  label,
  href,
  active,
  hovered,
  ringId,
  onHover,
  onSelect,
  className,
}: {
  label: string;
  href: string;
  active: boolean;
  hovered: boolean;
  ringId: string;
  onHover: () => void;
  onSelect: () => void;
  className?: string;
}) {
  const { ripples, spawn, remove } = useRipples();

  return (
    <motion.a
      href={href}
      whileTap={{ scale: 0.94 }}
      onPointerEnter={(e) => {
        onHover();
        spawn(e);
      }}
      onPointerMove={(e) => spawn(e)}
      onClick={(e) => {
        e.preventDefault();
        spawn(e, true);
        onSelect();
        scrollToHash(href);
      }}
      aria-current={active ? "page" : undefined}
      className={cn(
        "relative isolate block rounded-full px-4 py-2 text-sm font-medium outline-none transition-colors duration-300",
        "focus-visible:ring-2 focus-visible:ring-violet-400/70",
        active || hovered ? "text-white" : "text-neutral-400",
        className,
      )}
    >
      {/* liquid hover blob — slides between items */}
      {hovered && (
        <motion.span
          layoutId="nav-liquid"
          transition={LIQUID_SPRING}
          className="liquid-blob absolute inset-0 -z-20 rounded-full"
        />
      )}

      {/* animated gradient ring around the selected item */}
      {active && (
        <motion.span layoutId={ringId} transition={RING_SPRING} className="nav-ring absolute inset-0 -z-10 rounded-full" />
      )}

      {/* water ripples */}
      <span aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-full">
        {ripples.map((r) => (
          <motion.span
            key={r.id}
            initial={{ scale: 0, opacity: r.strong ? 0.7 : 0.35 }}
            animate={{ scale: 1, opacity: 0 }}
            transition={{ duration: r.strong ? 0.9 : 0.75, ease: "easeOut" }}
            onAnimationComplete={() => remove(r.id)}
            className="ripple absolute rounded-full"
            style={{ left: r.x - r.size / 2, top: r.y - r.size / 2, width: r.size, height: r.size }}
          />
        ))}
      </span>

      <span className="relative">{label}</span>
    </motion.a>
  );
}

function LangToggle() {
  const { t, toggle } = useLang();
  return (
    <button
      onClick={toggle}
      aria-label={t.ui.switchAria}
      className="inline-flex h-9 items-center gap-1.5 rounded-full border border-white/10 px-3 text-xs font-medium text-neutral-300 transition hover:border-violet-400/60 hover:text-white"
    >
      <Globe className="h-3.5 w-3.5" />
      {t.ui.switchTo}
    </button>
  );
}

export function Navbar() {
  const { t } = useLang();
  const spied = useActiveSection(t.nav.map((n) => n.href.slice(1)));
  const [picked, setPicked] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const pickTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  // A click wins over scroll-spy until the smooth scroll has settled.
  const active = picked ?? spied;
  const select = (href: string) => {
    setPicked(href.slice(1));
    clearTimeout(pickTimer.current);
    pickTimer.current = setTimeout(() => setPicked(null), 1600);
    setOpen(false);
  };
  useEffect(() => () => clearTimeout(pickTimer.current), []);

  // close the mobile menu on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const brand = (
    <button
      onClick={() => {
        select("#home");
        scrollToHash("#home");
      }}
      className="flex shrink-0 items-center gap-2 rounded-full ps-3 pe-2 font-mono text-sm font-bold text-white"
    >
      <span className="h-2 w-2 rounded-full bg-gradient-to-br from-violet-400 to-cyan-400 shadow-[0_0_10px_rgba(139,92,246,0.9)]" />
      {t.profile.shortName}
    </button>
  );

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3 sm:pt-5">
      <LiquidFilter />

      <nav
        ref={navRef}
        onPointerMove={(e) => {
          const r = navRef.current!.getBoundingClientRect();
          navRef.current!.style.setProperty("--mx", `${e.clientX - r.left}px`);
        }}
        onPointerLeave={() => setHovered(null)}
        className="liquid-nav group/nav relative flex w-full max-w-md items-center justify-between gap-1 rounded-full p-1.5 sm:w-auto sm:max-w-none"
      >
        {/* light that follows the mouse across the glass */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-full opacity-0 transition-opacity duration-500 group-hover/nav:opacity-100"
          style={{ background: "radial-gradient(160px circle at var(--mx, 50%) 50%, rgba(167,139,250,0.16), transparent 70%)" }}
        />

        {brand}

        <ul className="hidden items-center sm:flex">
          {t.nav.map((item) => (
            <li key={item.href}>
              <NavLink
                {...item}
                ringId="nav-ring"
                active={active === item.href.slice(1)}
                hovered={hovered === item.href}
                onHover={() => setHovered(item.href)}
                onSelect={() => select(item.href)}
              />
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1 ps-1">
          <span className="me-1 hidden h-5 w-px bg-white/10 sm:block" />
          <LangToggle />
          <button
            onClick={() => setOpen((o) => !o)}
            aria-label="Menu"
            aria-expanded={open}
            className="grid h-9 w-9 place-items-center rounded-full border border-white/10 text-neutral-300 transition hover:text-white sm:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      {/* mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -12, scale: 0.97, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -8, scale: 0.98, filter: "blur(6px)" }}
            transition={{ duration: 0.25 }}
            className="liquid-nav liquid-nav-solid absolute inset-x-3 top-[4.25rem] mx-auto flex max-w-md flex-col gap-1 rounded-3xl p-2 sm:hidden"
          >
            {t.nav.map((item, i) => (
              <motion.li
                key={item.href}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.04 * i }}
              >
                <NavLink
                  {...item}
                  ringId="nav-ring-mobile"
                  className="px-5 py-3 text-base"
                  active={active === item.href.slice(1)}
                  hovered={hovered === item.href}
                  onHover={() => setHovered(item.href)}
                  onSelect={() => select(item.href)}
                />
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </header>
  );
}
