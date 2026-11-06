import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Smoothly scrolls to an in-page anchor (uses Lenis when available). */
export function scrollToHash(href: string) {
  const el = document.querySelector<HTMLElement>(href);
  if (!el) return;
  if (window.__lenis) window.__lenis.scrollTo(el, { offset: -20, duration: 1.4 });
  else el.scrollIntoView({ behavior: "smooth" });
}
