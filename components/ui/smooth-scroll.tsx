'use client'
import { ReactNode, useEffect } from 'react'
import Lenis from 'lenis'

declare global {
    interface Window { __lenis?: Lenis }
}

export interface SmoothScrollProps {
    children: ReactNode
}

// VengeanceUI smooth-scroll (exposes the Lenis instance for anchor navigation)
export function SmoothScroll({ children }: SmoothScrollProps) {
    useEffect(() => {
        const lenis = new Lenis({ lerp: 0.09 })
        window.__lenis = lenis
        let id = 0
        function raf(time: number) {
            lenis.raf(time)
            id = requestAnimationFrame(raf)
        }
        id = requestAnimationFrame(raf)
        document.body.classList.remove('loading');
        return () => {
            cancelAnimationFrame(id)
            lenis.destroy()
            delete window.__lenis
        }
    }, [])

    return <>{children}</>
}

export default SmoothScroll
