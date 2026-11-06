'use client'
import { ReactNode, useEffect } from 'react'
import Lenis from 'lenis'

declare global {
    interface Window { __lenis?: Lenis }
}

// VengeanceUI smooth-scroll — exposes the Lenis instance for anchor navigation
// and falls back to native scrolling when the user prefers reduced motion.
export function SmoothScroll({ children }: { children: ReactNode }) {
    useEffect(() => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

        const lenis = new Lenis({ lerp: 0.09 })
        window.__lenis = lenis
        let frame = 0
        const raf = (time: number) => {
            lenis.raf(time)
            frame = requestAnimationFrame(raf)
        }
        frame = requestAnimationFrame(raf)

        return () => {
            cancelAnimationFrame(frame)
            lenis.destroy()
            delete window.__lenis
        }
    }, [])

    return <>{children}</>
}
