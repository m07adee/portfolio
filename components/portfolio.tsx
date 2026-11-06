"use client";

import { MotionConfig } from "framer-motion";

import { SmoothScroll } from "@/components/ui/smooth-scroll";
import { LangProvider } from "@/components/lang-provider";
import { Navbar } from "@/components/navbar";
import { CursorGlow, ScrollProgress } from "@/components/effects";
import { Hero } from "@/components/sections/hero";
import { Stats } from "@/components/sections/stats";
import { About } from "@/components/sections/about";
import { Work } from "@/components/sections/work";
import { Journey } from "@/components/sections/journey";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";
import { useFinePointer } from "@/lib/hooks";

export default function Portfolio() {
  const finePointer = useFinePointer();

  return (
    <LangProvider>
      {/* honour the OS "reduce motion" setting for all Framer animations */}
      <MotionConfig reducedMotion="user">
        <SmoothScroll>
          <ScrollProgress />
          {finePointer && <CursorGlow />}
          <Navbar />
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
      </MotionConfig>
    </LangProvider>
  );
}
